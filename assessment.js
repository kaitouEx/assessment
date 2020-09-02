'use strict'; //厳格モードで宣言後の記述ミスをエラーとして表示してくれる。
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

// assessmentButton.onclick = function() {
//     console.log('ボタンが押されました。');
//     //TODO 診断エリアの作成
//     //TODO tweetエリアの作成
// }

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        return;
    } else {
        console.log(userName);
    }
    //TODO 診断エリアの作成
    const header = document.createElement('h3');
    //診断エリアがボタンを押す時に古い診断結果を全て消すようにする
    removeAllChildren(resultDivided);

    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    //TODO tweetエリアの作成

    // <a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="診断結果の文章" data-show-count="false">Tweet #あなたのいいところ</a>
    //     <script async src="https://platform.twitter.com/widgets.js"
    //         charset="utf-8"></script>
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent('あなたのいいところ') + "&ref_src=twsrc%5Etfw";
    anchor.setAttribute('href', hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute('data-text', result);
    anchor.innerText = "Tweet #あなたのいいところ";
    tweetDivided.appendChild(anchor);

    //scriptタグを追加する
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

}

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
]

// @param{string} element

function removeAllChildren(element) {
    //診断エリアがボタンを押す時に古い診断結果を全て消すようにする
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


// 名前の文字列を渡すと診断結果を返す関数
// @param{string} userName
// @return{string} 診断結果

function assessment(userName) {
    let sumOfCharCode = 0;
    // Console.log('ABCD'.charCodeAt(0));// ASCIIコードの65を表示
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }

    const index = sumOfCharCode % answers.length; //answers配列の数で割った余りをindexに
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

// console.log(assessment('愛'));
// console.log(assessment('藍'));
// console.log(assessment('須藤藍'));

//　エラー出ない
// console.assert(
//     assessment('太郎') ===
//     '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
//     '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
// );

//　エラー出るテストコード
console.assert(
    assessment('次郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('次郎') === assessment('次郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
