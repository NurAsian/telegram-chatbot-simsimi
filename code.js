
var tg = new azkadevtelegram.telegram("tokenbot");
function setWebhook() {
    var url = "urlapp";
    var data = {
        "url": url
    };
    var r = tg.request("setWebhook", data);
    Logger.log(r);
}

function deleteWebhook() {
    var r = tg.request("deleteWebhook");
    Logger.log(r);
}

function getWebhook() {
    var r = tg.request("getWebhookInfo");
    Logger.log(r);
}

function doGet(e) {
    return ContentService.createTextOutput("proses data");
}
function doPost(e) {
    var update = tg.doPost(e);
    if (update) {
        try {
            if (update.message){
              var msg = update.message;
              var user_id = msg.from.id;
              var chat_id = msg.chat.id;
              var text = msg.text?msg.text:false;
              var caption = msg.caption?msg.caption:false;
              var msg_id = msg.message_id;
              
              if (text == "/start"){
                var option = {
                  "chat_id": chat_id,
                  "text": "Hello there start message"
                }
                return tg.request("sendMessage", option);
              }              
              
              if (text){
                var caption = simsimi(text, "id");
                var option = {
                  "chat_id": chat_id,
                  "text": caption
                }
                return tg.request("sendMessage", option);
              }


            }
        } catch (error) {
            if (update.message) {
                var parameter = {
                    'chat_id': update.message.chat.id,
                    "text": error.message,
                    'parse_mode': "HTML"
                };
                return tg.request('sendMessage', parameter);
            }

            if (update.callback_query) {
                var parameter = {
                    'chat_id': update.callback_query.message.chat.id,
                    "text": error.message,
                    'parse_mode': "HTML"
                };
                return tg.request('sendMessage', parameter);
            }
        }
    }
}

function simsimi(text, lang = "id"){
 var url = "https://api.simsimi.net/v1/?text="+text+"&lang="+lang;
 var response = JSON.parse(UrlFetchApp.fetch(url).getContentText())
 if (response.success) {
   var msg = response.success;
 } else{
   var msg = "Gagal";
 }
 return msg;
}
