const crypto = require('crypto');

//创世区块
const initBlock = {
	index: 0,
	data: 'hello nblockchain',
	prevHash: '0',
	timestamp: 1669737041347,
	nonce: 135337,
	hash: '00005440a1ea069e32569b623d682b423df89d60f7e0482abc036678d0592447',
};
class Blockchain {
	constructor() {
		this.blockchain = [initBlock];
		this.data = [];
		this.difficulty = 4;
	}

	//获取最新区块
	getLastBlock() {
		return this.blockchain[this.blockchain.length - 1];
	}
	//挖矿
	mine() {
		const newBlock = this.generateNewBlock();
		//校验区块是否合法
		if (this.isValidBlock(newBlock) && this.isValidChain(this.blockchain)) {
			this.blockchain.push(newBlock);
		} else {
			console.log('区块不合法');
		}
	}

	//生成新区块
	generateNewBlock() {
		let nonce = 0;
		const index = this.blockchain.length;
		const data = this.data;
		const prevHash = this.getLastBlock().hash;
		const timestamp = Date.now();
		let hash = this.computeHash(index, prevHash, timestamp, data, nonce);
		while (hash.slice(0, this.difficulty) !== '0'.repeat(this.difficulty)) {
			nonce++;
			hash = this.computeHash(index, prevHash, timestamp, data, nonce);
		}
		return {
			index,
			data,
			prevHash,
			timestamp,
			nonce,
			hash,
		};
	}

  //计算hash值
  compoteHashForBlock({index, prevHash, timestamp, data, nonce}){
    return this.computeHash(index, prevHash, timestamp, data, nonce);
  }
	//计算哈希
	computeHash(index, prevHash, timestamp, data, nonce) {
		return crypto
			.createHash('sha256')
			.update(index + prevHash + timestamp + data + nonce)
			.digest('hex');
	}

	//校验区块
	isValidBlock(newBlock,lastBlock = this.getLastBlock()) {
    if(newBlock.index !== lastBlock.index+1){
      return false;
    }else if(newBlock.timestamp  <= lastBlock.timestamp){
      return false;
    }else if(newBlock.prevHash !== lastBlock.hash){
      return false;
    }else if(newBlock.hash.slice(0,this.difficulty)!== '0'.repeat(this.difficulty)){
      return false;
    }else if(newBlock.hash !== this.compoteHashForBlock(newBlock)){
      return false;
    }
    return true;
  }

  //校验区块链
  isValidChain(chain=this.blockchain){
    //校验除创世区块外的区块
    for(let i = chain.length-1;i >=1;i--){
      if(!this.isValidBlock(chain[i],chain[i-1])){
        return false;
      }
    }
    if(JSON.stringify(chain[0]) !== JSON.stringify(initBlock)){
      return false;
    }
    return true;
  }

}
let bc = new Blockchain();
bc.mine();
bc.blockchain[1].hash = "999";
bc.mine();
bc.mine();
bc.mine();
console.log(bc.blockchain);
