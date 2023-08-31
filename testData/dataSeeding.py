import psycopg2
import json 
filename = 'testdata.json'

def convert_To_Binary(filename):
    with open(filename, 'rb') as file:
        data = file.read()
    return data




def insert_data(data):
    conn = None
    
    try:
        conn = psycopg2.connect(
        dbname="postgres",
        user="root",
        password="postgres",
        host="127.0.0.1",  # 通常是 "localhost" 或你的主機 IP 地址
        port="5432"   # 預設是 5432
        )
        cur = conn.cursor()
        

        # Replace the following lines with appropriate values from your JSON data
        productnum = data["productnum"]
        productname = data["productname"]
        approvaldate = data["approvaldate"]
        startdate = data["startdate"]
        enddate = data["enddate"]
        approvalnum = data["approvalnum"]
        company = data["company"]
        status = data["status"]
        productcontent_name = data["productcontent"]
        treaty_name = data["treaty"]
        rate_name = data["rate"]

        
        file_data = convert_To_Binary(productcontent_name)
        productcontent = []
        productcontent.append(psycopg2.Binary(file_data))

        file_data = convert_To_Binary(treaty_name)
        treaty = []
        treaty.append(psycopg2.Binary(file_data))

        file_data = convert_To_Binary(rate_name)
        rate = []
        rate.append(psycopg2.Binary(file_data))

        cur.execute("INSERT INTO data(productNum, productName, approvalDate, startDate, endDate, approvalNum, company, productContent, treaty, rate, status) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                    (productnum, productname, approvaldate,startdate,enddate,approvalnum, company, productcontent, treaty, rate, status))

        cur.close()
        
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
        
    finally:
        if conn is not None:
            conn.commit()

# insert_BLOB('Ideas.pdf')
with open(filename, 'r', encoding='utf-8') as json_file:
    data_list = json.load(json_file)
    for data in data_list:
        insert_data(data)



