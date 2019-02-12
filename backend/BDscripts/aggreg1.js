db = db.getSiblingDB('rango')
cursor = db.registroentrega.find();
while ( cursor.hasNext() ) {
	printjson( cursor.next() );
}
