# onecrm_tii_data
## To run the project
### Method 1.
####To run: 
1. docker compose up -d
2. docker exec -it onecrm_backend
3. python3 seeding.py

####To stop:
docker compose down --volumes

### Method 2.
####To run: 
1. chmod +x run.sh
2. ./run

####To stop:
1. chmod +x stop.sh
2. ./stop
