FROM fusuf/whatsasena:latest

RUN git clone https://github.com/BOT-PROJECT-MANSIEZ/Watsahapa-AsenaMansiez /root/Watsahapa-AsenaMansiez
WORKDIR /root/Watsahapa-AsenaMansiez/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
