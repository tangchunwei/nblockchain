
const crypto = require("crypto");

//创世区块
const initBlock = {
  index: 0,
  data: 'hello nblockchain',
  prevHash: '0',
  timestamp: 1669737041347,
  nonce: 135337,
  hash: '00005440a1ea069e32569b623d682b423df89d60f7e0482abc036678d0592447'
}
class Blockchain{
  constructor(){
    this.blockchain = [initBlock]
    this.data = []
    this.difficulty = 4
  } 

  //获取最新区块
  getLatestBlock(){
    return this.blockchain[this.blockchain.length-1]
  }
  //挖矿
  mine(){
    let nonce = 0 
    const index = this.blockchain.length
    const data = this.data
    const prevHash = this.getLatestBlock().hash
    const timestamp = Date.now()
    let hash = this.computeHash(index,prevHash,timestamp,data,nonce)
    while(hash.slice(0,this.difficulty) !== "0".repeat(this.difficulty)){
      nonce++
      hash = this.computeHash(index,prevHash,timestamp,data,nonce)
    }
    console.log("挖矿结束",{
      index,
      data,
      prevHash,
      timestamp,
      nonce,
      hash
    })
  }

  //生成新区块
  generateNewBlock(){

  }

  //计算哈希
  computeHash(index,prevHash,timestamp,data,nonce){
    return crypto.createHash("sha256").update(index+prevHash+timestamp+data+nonce).digest("hex")
  }

  //校验区块
  isValidBlock(){}
  

}

let blockchain = new Blockchain()
blockchain.mine()