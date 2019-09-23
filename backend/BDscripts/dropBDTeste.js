db = db.getSiblingDB('rangoTST')
db.registroentregas.drop()
print(db.getCollectionNames())
print("Database wiped")
