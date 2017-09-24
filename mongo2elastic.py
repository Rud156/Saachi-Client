from pymongo import MongoClient
from elasticsearch import Elasticsearch, helpers

ES = Elasticsearch()
CLIENT = MongoClient()
DATA_BASE = CLIENT.Hackocracy
COLLECTION = DATA_BASE.candidates

ES.indices.delete(index='hackocracy', ignore=[400, 404])
ES.indices.create(index='hackocracy')

counter = 0
bulk_list = []
for candidate in COLLECTION.find():
    if counter >= 1000:
        helpers.bulk(ES, bulk_list)
        print 'Inserting into Elasticsearch'
        bulk_list = []
        counter = 0
        # break

    try:
        # print candidate
        # print '\n'
        data_set = {
            'name': candidate['name'],
            'Address': candidate['Address:'],
            'Party': candidate['Party:'],
            'Age': candidate['Age:'],
            'hash': candidate['hash'],
            'crimes': candidate['crimes'],
            'Education': candidate['Education'],
            'location': candidate['location'],
            'assets': candidate['assets'],
            'liabilities': candidate['liabilities'],
            'S/o|D/o|W/o': candidate['S/o|D/o|W/o:']
        }

        bulk_index = {
            '_index': 'hackocracy',
            '_type': 'document',
            '_id': candidate['hash'],
            '_source': data_set
        }

        bulk_list.append(bulk_index)
    except KeyError as error:
        print error.message
        print 'Invalid Data'

    counter += 1

helpers.bulk(ES, bulk_list)
print 'Wowser!! All Done'
