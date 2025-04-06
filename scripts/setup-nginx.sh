#!/bin/bash

# Configurações do projeto
PROJECT_NAME="meu-carro-api"
DOMAIN="api.meucarro.srv603687.hstgr.cloud"
PORT="4011"

NGINX_AVAILABLE="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"
NGINX_CONF_PATH="$NGINX_AVAILABLE/$PROJECT_NAME"

echo "🔧 Criando configuração do Nginx para $PROJECT_NAME..."

# Cria o arquivo de configuração do Nginx
sudo tee $NGINX_CONF_PATH >/dev/null <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Ativa o site
echo "🔗 Ativando site no Nginx..."
sudo ln -sf $NGINX_CONF_PATH $NGINX_ENABLED/$PROJECT_NAME

# Testa configuração
echo "🧪 Testando configuração do Nginx..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "🚀 Recarregando Nginx..."
    sudo systemctl reload nginx

    echo "🔐 Solicitando certificado SSL com Certbot (sem e-mail)..."
    sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --register-unsafely-without-email

    echo "✅ Tudo pronto! Seu site está com HTTPS ativado."
else
    echo "❌ Erro na configuração do Nginx. Verifique antes de continuar."
fi
