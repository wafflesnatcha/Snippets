var a = '';
var b = '';
 
db.transaction(function(transaction) {
	transaction.executeSql(
		"UPDATE a set b=? where a=?;", 
		[ a, b ]
	);
});