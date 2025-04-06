#!/bin/bash

CONTAINER_NAME="meu-carro-api"
IMAGE_NAME="meu-carro-api"
DB_URL="mongodb+srv://top-driver:5gLCNcaaoD4n48Zk@projetos-cin.rm3yk.mongodb.net/meu-carro-db?retryWrites=true&w=majority&appName=projetos-cin"

echo "=== Parando o contêiner (se estiver em execução) ==="
docker stop $CONTAINER_NAME || true

echo "=== Removendo o contêiner (se existir) ==="
docker rm $CONTAINER_NAME || true

echo "=== Removendo a imagem (se existir) ==="
docker rmi $IMAGE_NAME || true

echo "=== Buildando a imagem ==="
docker build -t $IMAGE_NAME .

echo "=== Iniciando o contêiner ==="
docker run -d \
    -e DATABASE_URL="$DB_URL" \
    --name $CONTAINER_NAME \
    -p 4011:4011 \
    $IMAGE_NAME

echo "=== Deploy finalizado. Execute 'docker logs -f $CONTAINER_NAME' para acompanhar os logs ==="
