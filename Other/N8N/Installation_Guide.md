---
title: Guide d'installation de N8N sur Linux avec Docker Compose
  (Pseudo-Production)
---

# 1. Objectif

Mettre en place une instance n8n stable sur un serveur Linux local en
utilisant Docker Compose, avec une configuration adaptée pour un
déploiement en pseudo-production (utilisation réelle mais sans exigences
de haute disponibilité).

# 2. Prérequis

Système d'exploitation\
- Linux : Ubuntu Server 22.04 LTS (recommandé, stable et maintenu
jusqu'en 2027).\
\
Logiciels\
- Docker Engine : 24.x (version stable LTS).\
- Docker Compose : v2.24+.\
- n8n : Dernière version stable 1.x (ex: n8nio/n8n:1.71.1).

# 3. Préparation du serveur

\`\`\`\
sudo apt update && sudo apt upgrade -y\
\
sudo apt install -y ca-certificates curl gnupg lsb-release\
\
curl -fsSL https://get.docker.com \| sudo bash\
\
docker \--version\
docker compose version\
\`\`\`

# 4. Structure du projet

\`\`\`\
mkdir -p /opt/n8n\
cd /opt/n8n\
mkdir .n8n\
\`\`\`

# 5. Fichier docker-compose.yml

\`\`\`yaml\
version: \"3.8\"\
\
services:\
n8n:\
image: n8nio/n8n:1.71.1\
container_name: n8n\
restart: unless-stopped\
ports:\
- \"5678:5678\"\
environment:\
- GENERIC_TIMEZONE=Europe/Paris\
- GENERIC_LOCALE=fr\
- N8N_BASIC_AUTH_ACTIVE=true\
- N8N_BASIC_AUTH_USER=\${N8N_USER}\
- N8N_BASIC_AUTH_PASSWORD=\${N8N_PASSWORD}\
- N8N_HOST=\${N8N_HOST}\
- N8N_PORT=5678\
- N8N_PROTOCOL=https\
- NODE_ENV=production\
- EXECUTIONS_PROCESS=main\
- DB_TYPE=sqlite\
- DB_SQLITE_VACUUM_ON_STARTUP=true\
- N8N_EDITOR_BASE_URL=https://\${N8N_HOST}/\
- N8N_PUBLIC_API_DISABLED=false\
volumes:\
- ./n8n_data:/home/node/.n8n\
\`\`\`

# 6. Variables d'environnement

Créer un fichier \`.env\` dans \`/opt/n8n\` :\
\
\`\`\`env\
N8N_USER=admin\
N8N_PASSWORD=mot_de_passe_secure\
N8N_HOST=automation.mondomaine.com\
NODE_ENV=production\
\`\`\`\
\
Notes :\
- Pour un usage local sans domaine : mettre \`N8N_HOST=127.0.0.1\`.\
- En pseudo-production, privilégier une authentification forte.\
- Prévoir un reverse proxy (Nginx/Traefik + SSL) si exposé à Internet.

# 7. Lancement de l'application

\`\`\`\
docker compose up -d\
docker compose logs -f\
\`\`\`\
Accéder à : http://\<IP_SERVEUR\>:5678

# 8. Bonnes pratiques en pseudo-production

\- Sauvegardes régulières du répertoire \`./n8n_data/\`.\
- Mises à jour avec \`docker compose pull && docker compose up -d\`.\
- Sécurité : HTTPS via reverse proxy, authentification basique activée,
firewall.

# 9. Schéma d'architecture simplifiée

\[Client navigateur\] \-\--\> \[Reverse Proxy Nginx/Traefik + SSL\]
\-\--\> \[N8N Docker Container\]\
\|\
\[Volume / n8n_data\]

# 10. Conclusion

Cette configuration permet un déploiement stable et sécurisé de n8n en
pseudo-production.\
\
Pour une production critique : prévoir une base PostgreSQL externe, du
monitoring et un reverse proxy SSL automatisé.

Docker Compose file avec base PostgreSQL:

\`\`\`yaml

version: \'3.7\'

services:

db:

image: postgres:14

environment:

\- POSTGRES_USER=n8n

\- POSTGRES_PASSWORD=n8npass

\- POSTGRES_DB=n8n

volumes:

\- postgres_data:/var/lib/postgresql/data

n8n:

image: n8nio/n8n

ports:

\- \"5678:5678\"

environment:

\- DB_TYPE=postgresdb

\- DB_POSTGRESDB_HOST=db

\- DB_POSTGRESDB_DATABASE=n8n

\- DB_POSTGRESDB_USER=n8n

\- DB_POSTGRESDB_PASSWORD=n8npass

\- N8N_BASIC_AUTH_ACTIVE=true

\- N8N_BASIC_AUTH_USER=admin

\- N8N_BASIC_AUTH_PASSWORD=strongpass

\- N8N_HOST=n8n.yourdomain.com

\- WEBHOOK_TUNNEL_URL=https://n8n.yourdomain.com

depends_on:

\- db

volumes:

\- n8n_data:/home/node/.n8n

volumes:

postgres_data:

n8n_data:

\`\`\`

Fichier de configuration secure proxy simple :

\`\`\`

server {

listen 443 ssl;

server_name n8n.yourdomain.com;

ssl_certificate /etc/letsencrypt/live/n8n.yourdomain.com/fullchain.pem;

ssl_certificate_key
/etc/letsencrypt/live/n8n.yourdomain.com/privkey.pem;

location / {

proxy_pass http://localhost:5678;

proxy_set_header Host \$host;

proxy_set_header X-Real-IP \$remote_addr;

proxy_set_header X-Forwarded-For \$proxy_add_x\_forwarded_for;

proxy_set_header X-Forwarded-Proto \$scheme;

}

}

\`\`\`
