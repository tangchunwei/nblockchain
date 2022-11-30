const vorpal = require('vorpal')();
const BlockChain = require('./blockchain');
const blockchain = new BlockChain();
vorpal.command('mine', '挖矿').action(function (args, callback) {
	const newBlock = blockchain.mine();
	if (newBlock) {
		this.log(newBlock);
	}
	callback();
});
vorpal.command('chain', '查看区块链').action(function (args, callback) {
	this.log(blockchain.blockchain);
	callback();
});
// vorpal
//   .command('foo', 'Outputs "bar".')
//   .action(function(args, callback) {
//     this.log('bar');
//     callback();
//   });

vorpal.delimiter('nblockchain$').show();
