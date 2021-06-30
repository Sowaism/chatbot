'use strict'
{//全体を囲むことで、変数chatsのなかにアクセスできなくなる。検証ツールでchatsと打つと確認できる。

//グローバル定数定義
const dom = {
  messageArea     : document.querySelector('#message_area'),
  messageListArea : document.querySelector('#message_area ul'),
  addBtn          : document.querySelector('#addbtn'),
  txtEntry        : document.querySelector('#txtEntry'),
};

//XSS対策 文字列エスケープ
function escapeHTML(string){
  return string.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27');
};

//プレイヤー：個々の発言内容を持っている配列
let chats = [];

//ボット：自動返信テキストセット
const botTxt = [
  'こんにちは！メッセージありがと〜！',
  '元気？僕は元気だよー！',
  'いえ〜い！！',
  '僕はチャットボットのマークだよ！',
  '...',
  '大吉！',
];

//ユーザー：入力テキストの取得
const txtVal = () => dom.txtEntry.value;
//ボット：ランダムに取り出し
const chatRandomTxt = ()=> botTxt[Math.floor(Math.random() * botTxt.length)];

//ユーザー：HTML要素を生成
function createListItemMe(txt) {
  const li = document.createElement('li');
  li.innerHTML = `
  <div class="my_message">
  <p>${txt}</p>
  <div><img src="img/me.jpg" width="40" height="40" alt="自分の画像"></div>
  </div>`;
  return li;
};
//ボット：HTML要素を生成
function createListItemYou(botTxt) {
  const li = document.createElement('li');
  li.innerHTML = `
  <div class="you_message">
  <div><img src="img/you.jpg" width="40" height="40" alt="相手の画像"></div>
  <p>${botTxt}</p>
  </div>`;
  return li;
};

//ユーザー：ユーザー情報を変数chatsの配列の中に入れる
function addArrayMe() {
  chats.push({ player: true, txt: escapeHTML(txtVal()) });
  renderHTML();
  saveToLocalStorage();
}

//ボット：ボット情報を配列chatsの配列の中に入れる。
function arrayAddYou() {
  chats.push({ player: false, txt: chatRandomTxt() });
  renderHTML();
  saveToLocalStorage();
};

//ボット：自動返信(2秒後)
function chatReply() {
  setTimeout(arrayAddYou, 2000);
};

//変数chatsに入ったユーザー情報をローカルストレージにJSON形式に変換して保存する
function saveToLocalStorage(){
  const jsonObj = JSON.stringify(chats);
  localStorage.setItem('chats',jsonObj);
};

//ローカルストレージのchatsキーの内容を取得する
function loadFromLocalStorage() {
  if (localStorage.hasOwnProperty('chats')) {
    const chatsObj = localStorage.getItem('chats');
    const jsObj = JSON.parse(chatsObj);
    // chats = '';
    chats = jsObj;
    renderHTML();
  }
};

//ユーザー・ボット情報をHTMLに描画する
function renderHTML() {
  dom.messageListArea.innerHTML = '';
  chats.forEach(chat => {
    //ユーザー：入力テキストをHTML要素に追加する
    if (chat.player === true) {
      dom.messageListArea.appendChild(createListItemMe(chat.txt));
    }
    //ボット：入力テキストをHTML要素に追加する
    if (chat.player === false) {
      dom.messageListArea.appendChild(createListItemYou(chat.txt));
    }
    scrollToBottom();
  });
}

//チャットエリアの高さの取得
const chatHeight = ()=> dom.messageListArea.clientHeight;

//最下部スクロール
function scrollToBottom() {
  dom.messageArea.scrollTo(0, chatHeight());
 }

 //未入力&入力 ボタン活性処理
function enterButtonFlag() {
  if (txtVal() == false) {
    dom.addBtn.disabled = true;
  } else {
    dom.addBtn.disabled = false;
  }
  return;
};


//イベント
dom.txtEntry.addEventListener('input', enterButtonFlag);
dom.addBtn.addEventListener('click', addArrayMe);
dom.addBtn.addEventListener('click', chatReply);
dom.addBtn.addEventListener('click', scrollToBottom);
window.addEventListener('load', loadFromLocalStorage);


} //全体を囲むことで、変数chatsのなかにアクセスできなくなる。検証ツールでchatsと打つと確認できる。


















// function scrollUnder() {
//   dom.messageListArea.scrollIntoView(true);
// };

// class Chatbot{
//   constructor(txt){
//     this.txt = txt;
//   }
// };

// let me = new Chatbot(txt);
// // console.log(me);


// function createListItemYou() {
//   const li = document.createElement('li');
//   const divText = todoInstance.txt;
//   li.innerHTML = `
//   <div class="you_message">
//   <div><img src="img/you.jpg" width="40" height="40" alt="相手の画像"></div>
//   <p>${divText}</p>
//   </div>
//   `;
//   return li
// };
// createListItemYou();

//入力値を取得
//HTMLを生成
//入力値リセット
