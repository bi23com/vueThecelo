import { StableToken } from '@celo/contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';
import { ensureLeading0x } from '@celo/utils/lib/address';

import { Alfajores, Baklava, Mainnet, useContractKit, ContractKitProvider } from '@celo-tools/use-contractkit';
// webpack:///./node_modules/_@walletconnect_client@2.0.0-beta.9@@walletconnect/client/dist/esm/client.js?68d2 
import { BigNumber } from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3';
import React from 'react';
// 
import { Toaster } from 'react-hot-toast';

import { TYPED_DATA } from '../../utils';

//创建web3对象
var web3 = new Web3()

const defaultSummary = {
  name: '',
  address: '',
  wallet: '',
  celo: new BigNumber(0),
  cusd: new BigNumber(0),
  ceur: new BigNumber(0),
};

function truncateAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(38)}`;
}

const networks = [Alfajores, Baklava, Mainnet];

export function Home(props) {
  const { message } = props
  function handleClick(text, type){
    //通过props属性获取父组件的getdata方法，并将this.state值传递过去
    props.getdata(text, type);
  }

  const isCreate = true;
  const { kit, address, network, updateNetwork, connect, destroy, performActions, walletType, } = useContractKit();

  const [summary, setSummary] = useState(defaultSummary);
  const [sending, setSending] = useState(false);

  const fetchSummary = useCallback(async () => {
    if (!address) {
      setSummary(defaultSummary);
      return;
    }

    const [accounts, goldToken, cUSD, cEUR] = await Promise.all([
      kit.contracts.getAccounts(),
      kit.contracts.getGoldToken(),
      kit.contracts.getStableToken(StableToken.cUSD),
      kit.contracts.getStableToken(StableToken.cEUR),
    ]);
    const [summary, celo, cusd, ceur] = await Promise.all([
      accounts.getAccountSummary(address).catch(() => defaultSummary),
      goldToken.balanceOf(address),
      cUSD.balanceOf(address),
      cEUR.balanceOf(address),
    ]);
    setSummary({
      ...summary,
      celo,
      cusd,
      ceur,
    });
  }, [address, kit]);
  
  // 去锁定
  const toLock = async () => {
    var amount = props.lockChaNum;
    var amt = web3.utils.toWei(amount.toString(), 'ether');
    try {
      setSending(true);
      await performActions(async (k) => {
        const celo = await k.contracts.getLockedGold();   // 合约
        // "feeCurrency" | "gatewayFeeRecipient" | "gatewayFee" | "to" | "gas" | "gasPrice" | "nonce" | "chainId" | "common" | "chain" | "hardfork"
        // , nonce: 21000
        var gasPrice = window.localStorage.getItem('GasPrice') * 10 || 500000000;
        await celo.lock().sendAndWaitForReceipt({ from: k.defaultAccount, value: '0x' + Number(amt).toString(16), gasPrice: gasPrice, gas: 2000000 });
      });
      handleClick('Successfully locked', 'success');
      props.callBackFun('lock成功');
      await fetchSummary();
    } catch (e) {
      handleClick(e.message, 'error');
    } finally {
      setSending(false);
    }
  };
  // continue 去投票
  const toVote = async()=> {
    var lockNum = props.lockNum;
    var amount = props.voteType;
    var voteNum = '';
    if(amount == '3'){ voteNum = 'Yes' }
    if(amount == '2'){ voteNum = 'No' }
    if(amount == '1'){ voteNum = 'Abstain' }
    var proposalId = props.proposalId;
    var index = -1;
    try {
      setSending(true);
      await performActions(async (k) => {
        const celo = await k.contracts.getGovernance();   // 合约
        var result = await celo.getDequeue();
        for (var i = 0; i < result.length; i++) {
          if (Number(result[i]) == Number(proposalId)) {
            index = i
            break
          }
        }
        // 可以调起来
        // await celo.dequeueProposalsIfReady(proposalId, '0x' + Number(index).toString(16), 'Yes').sendAndWaitForReceipt({ from: '0x500fbdbe3a2122ba773f986a12eabaee28296df0'});
        // await celo.vote( proposalId, '0x' + Number(index).toString(16), 'yes' ).sendAndWaitForReceipt({ from: k.defaultAccount });
        //  
        // await (await celo.vote(proposalId, '0x' + Number(index).toString(16), voteNum ))
        //   .sendAndWaitForReceipt({ from: k.defaultAccount, value: '0x' + Number(lockNum).toString(16) });
        var gasPrice = window.localStorage.getItem('GasPrice') * 10 || 500000000;
        await (await celo.vote(proposalId, voteNum)).sendAndWaitForReceipt({ from: k.defaultAccount, gasPrice: gasPrice, gas: 2000000 });
        // 
        
      });
      handleClick('Successfully voted', 'success');
      props.callBackFun('vote成功');
      await fetchSummary();
    } catch (e) {
      handleClick(e.message, 'error');
    } finally {
      setSending(false);
    }
  }
  // 创建账户
  const createAccount = async () => {       
    try {
      setSending(true);
      await performActions(async (k) => {
        const celo = await k.contracts.getAccounts();   // 合约
        var gasPrice = window.localStorage.getItem('GasPrice') * 10 || 500000000;
        await celo.createAccount().sendAndWaitForReceipt({ from: k.defaultAccount, gasPrice: gasPrice, gas: 2000000 });
      });
      handleClick('Successfully created account', 'success');
      props.callBackFun('创建成功');
      await fetchSummary();
    } catch (e) {
      handleClick(e.message, 'error');
    } finally {
      setSending(false);
    }
  };

  const testSignTypedData = async () => {
    setSending(true);
    try {
      await performActions(async (k) => {
        if (k.defaultAccount) {
          return await k.signTypedData(k.defaultAccount, TYPED_DATA);
        } else {
          throw new Error('No default account');
        }
      });
      handleClick('signTypedData succeeded', 'success');
    } catch (e) {
      handleClick(e.message, 'error');
    }

    setSending(false);
  };

  const testSignPersonal = async () => {
    setSending(true);
    try {
      // ensureLeading0x(Buffer.from('Hello').toString('hex')),
      await performActions(async (k) => {
        if (!k.defaultAccount) {
          throw new Error('No default account');
        }
        return await k.connection.sign(
          ensureLeading0x(props.fromData),
          k.defaultAccount
        );
      });
      handleClick('sign_personal succeeded', 'success');
    } catch (e) {
      handleClick(e.message, 'error');
    }

    setSending(false);
  };

  useEffect(() => {
    void fetchSummary();
  }, [fetchSummary]);

  // 设置钱包数据   地址....
  if(address){
    var setAddress = truncateAddress(address);
    localStorage.setItem('setAllAddress', address);
    localStorage.setItem('setAddress', setAddress);
    localStorage.setItem('walletType', walletType);
    var summaryAddress = summary.wallet ? truncateAddress(summary.wallet) : 'Not set';
    localStorage.setItem('summaryAddress', summaryAddress);
    
    var web3Num = {
      cELO: Web3.utils.fromWei(summary.celo.toFixed()),
      cUSD: Web3.utils.fromWei(summary.cusd.toFixed()),
      cEUR: Web3.utils.fromWei(summary.ceur.toFixed())
    }
    localStorage.setItem('web3Num', JSON.stringify(web3Num));
    props.sendWalletData('有address了');
  } else {
    localStorage.removeItem('setAllAddress');
    localStorage.removeItem('setAddress');
    localStorage.removeItem('walletType');
    localStorage.removeItem('summaryAddress');
    localStorage.removeItem('web3Num');
    props.sendWalletData('有address了');
  }

  return (
    <div className="App">
      { props.fromData == 'toCreate' ? 
        (
          <button onClick={createAccount} className="actConnect">Continue</button>
        ) : ''
      }
      { props.fromData == 'lock' ? 
        (
          // <p onClick={toLock} className="lockBtnSign cursorPointer">lock</p>
          <p onClick={toLock} className="actConnect">Lock</p>
        ) : ''
      }
      { props.fromData == 'toVote' ? 
        (
          <p onClick={toVote} className="actConnect">Continue</p>
        ) : ''
      }
    </div>
  );
}

function myReactComponent(props) {
  const { message } = props
  function getDatas(msg, type){
    let text = msg ? msg : '传递默认数据';
    props.onMyEvent(text, type);
  }
  function sendWalletData(type){
    props.GetWalletData(type);
  }
  function callBackFun(type){
    props.callBackFun(type);
  }

  return (
    <div>
      <ContractKitProvider
        dapp={{
          name: 'use-contractkit demo',
          description: 'A demo DApp to showcase functionality',
          url: 'https://use-contractkit.vercel.app',
          icon: 'https://use-contractkit.vercel.app/favicon.ico',
        }}
        networks={[Mainnet]}
        network={{
          name: 'celoDanceNode',
          rpcUrl: 'https://celo.dance/node',
          graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
          explorer: 'https://alfajores-blockscout.celo-testnet.org',
          // chainId: 62320,
          chainId: 42220,
        }}
      >
        <Toaster position="top-right" toastOptions={{ className: 'w-72 md:w-96', style: { padding: '0px', }, }} />
        <Home getdata={ getDatas } sendWalletData={ sendWalletData} callBackFun={callBackFun} fromData={props.fromData} lockChaNum={props.lockChaNum} proposalId={props.proposalId}
          voteType={props.voteType} lockNum={props.lockNum}></Home>
      </ContractKitProvider>
      <h2>{ message }</h2>
    </div>
  )
}
export default myReactComponent

