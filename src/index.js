const vorpal = require('vorpal')();
const Table = require('cli-table');
const BlockChain = require('./blockchain');
const blockchain = new BlockChain();

function formatLog(data){
  if(!Array.isArray(data)){
    data = [data];
  }
  const first = data[0];
  const head = Object.keys(first);
  const table = new Table({
    head: head,
    colWidths: [10, 20, 40, 20, 10, 40],
  });
  const res = data.map(v => {
    return head.map(h => v[h]);
  })
  table.push(...res);
  console.log(table.toString());
}



vorpal.command('mine', '挖矿').action(function (args, callback) {
	const newBlock = blockchain.mine();
	if (newBlock) {
		formatLog(newBlock);
	}
	callback();
});
vorpal.command('chain', '查看区块链').action(function (args, callback) {
	formatLog(blockchain.blockchain);
	callback();
});
// vorpal
//   .command('foo', 'Outputs "bar".')
//   .action(function(args, callback) {
//     this.log('bar');
//     callback();
//   });

vorpal.delimiter('nblockchain$').show();
