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

  useEffect(() => {
    void fetchSummary();
  }, [fetchSummary]);

  // 设置钱包数据   地址....
  if(address){
    var setAddress = truncateAddress(address);
    localStorage.setItem('setAllAddress', address);
    localStorage.setItem('setAddress', setAddress);
    localStorage.setItem('walletType', localStorage.getItem('use-contractkit/last-used-wallet'));
    var summaryAddress = summary.wallet ? truncateAddress(summary.wallet) : 'Not set';
    localStorage.setItem('summaryAddress', summaryAddress);
    // use-contractkit/last-used-network    设置的网络
    
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
  var ConnectText = (props.fromData == 'VoteConnect') ? 'Vote' : 'Connect';
  var connectCls = (props.fromData == 'VoteConnect') ? 'VoteCls' : 'actConnect';

  // const chainParams = params[chainId];

  return (
    <div className="App">
      {/* props.isClose == 'isdisConnect' */}
      { address ? 
        (
          <button className="disactConnect" onClick={destroy}>Disconnect</button>
        ) : 
        (
        <button className={connectCls} onClick={() => connect().then((e)=>{handleClick(e.message, 'success')}).catch((e) => handleClick(e.message, 'error'))}>{ConnectText}</button> 
        )
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

  return (
    <div>
      <ContractKitProvider
        dapp={{
          name: 'use-contractkit demo',
          description: 'A demo DApp to showcase functionality',
          url: 'https://use-contractkit.vercel.app',
          icon: 'https://use-contractkit.vercel.app/favicon.ico',
        }}
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
        <Home getdata={ getDatas } sendWalletData={ sendWalletData} fromData={props.fromData} isClose={props.isclose}></Home>
      </ContractKitProvider>
      <h2>{ message }</h2>
    </div>
  )
}
export default myReactComponent

