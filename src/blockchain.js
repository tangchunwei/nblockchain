
const crypto = require("crypto");
class Blockchain{
  constructor(){
    this.blockchain = []
    this.data = []
    this.difficulty = 4
    const hash = this.computeHash(0,"0",Date.now(),"hello nblockchain",1)
    console.log(hash)
  } 

  //挖矿
  mine(){

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