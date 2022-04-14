# eFishery test 


Create folder dan file .env dengan format key=value
contoh: 
key1=tas
key2=sepatu 
key3=baju

Port aplikasi 8088

Build docker base image alpine
1. docker build -t docker_name -f deployment/Dockerfile .
2. docker run -v $(pwd):/app/assets/files -p ${port}:8088 node 
$(pwd) adalah lokasi folder .env yang akan kita edit dan download 

Build docker base image distroless
1. docker build -t docker_name -f deployment/Dockerfile-distroless .
2. docker run -v $(pwd):/app/assets/files -p  ${port}:8088 node 
$(pwd) adalah lokasi folder .env yang akan kita edit dan download 

how to access access 
http://localhost:port/?file=name_env_file

contoh:
jika file yang dibuat bernama .env, maka seperti berikut
http://localhost:port/?file=.env
