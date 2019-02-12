db = db.getSiblingDB('rango')
cursor = db.registroentregas.aggregate( [
	{ $project : { quantidade: {$sum: "$items.quantidadeEntrega"}}},
	{ $group : { _id: null, qtde: {$sum: "$quantidade"}}},
	{ $project : { _id: 0, qtde: 1}}
	])

while ( cursor.hasNext() ) {
	printjson(cursor.next() )
}

cursor2 = db.registroentregas.aggregate( [
	{ $project : { day: {$substr: ["$dataEntrega", 0, 10]}, quantidade: {$sum: "$items.quantidadeEntrega"}}},
	{ $group : { _id: "$day", qtde: {$sum: "$quantidade"}}},
	{ $project : { _id: 1, qtde: 1}}
	])

while ( cursor2.hasNext() ) {
	printjson(cursor2.next() )
}
