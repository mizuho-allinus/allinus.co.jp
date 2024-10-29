
function openModal() {
    // フォームの入力内容を取得
    const name = document.getElementById("field-name").value;
    const japanese = document.getElementById("field-japanese").value;
    const email = document.getElementById("field-mail").value;
    const phone = document.getElementById("field-phone").value;
    const message = document.getElementById("field-message").value;

    // モーダル内に入力内容を表示
    document.getElementById("confirmName").textContent = name;
    document.getElementById("confirmJapanese").textContent = japanese;
    document.getElementById("confirmEmail").textContent = email;
    document.getElementById("confirmPhone").textContent = phone;
    document.getElementById("confirmMessage").textContent = message;

    // モーダルを表示
    document.getElementById("confirmationModal").style.display = "flex";
}

function closeModal() {
    // モーダルを非表示にする
    document.getElementById("confirmationModal").style.display = "none";
}

function submitForm() {
    // フォームの入力内容を取得
    const name = document.getElementById("field-name").value;
    const japanese = document.getElementById("field-japanese").value;
    const email = document.getElementById("field-mail").value;
    const phone = document.getElementById("field-phone").value;
    const message = document.getElementById("field-message").value;

    // GoogleフォームのエントリーIDに対応するデータをセット
    const formData = new FormData();
    formData.append("entry.1239578458", name);
    formData.append("entry.1234720087", japanese);
    formData.append("entry.1926065758", email);
    formData.append("entry.1094302724", phone);
    formData.append("entry.2026626099", message);

    // Googleフォームの送信URLに対してPOSTリクエストを送信
    fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSfJBJa_yB-2Q2up_DOeT1q9kMFBDipP8KS1BBOIsIvcEGGwFQ/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors"
    }).then(() => {
        // フォーム内容をクリア
        document.getElementById("field-name").value = "";
        document.getElementById("field-japanese").value = "";
        document.getElementById("field-mail").value = "";
        document.getElementById("field-phone").value = "";
        document.getElementById("field-message").value = "";

        // モーダルを閉じ、送信完了メッセージを表示
        document.getElementById("confirmationModal").style.display = "none";
        showThankYouModal();
    }).catch(error => {
        console.error("送信エラー:", error);
    });
}

function showThankYouModal() {
    // 送信完了メッセージのモーダルを表示
    const thankYouModal = document.createElement("div");
    thankYouModal.classList.add("modal");
    thankYouModal.style.display = "flex";

    thankYouModal.innerHTML = `
        <div class="modal-content">
            <h2>送信が完了しました</h2>
            <p>お問い合わせいただき、ありがとうございます。</p>
            <button onclick="closeThankYouModal()">閉じる</button>
        </div>
    `;

    document.body.appendChild(thankYouModal);
}

function closeThankYouModal() {
    // 送信完了メッセージのモーダルを非表示にして削除
    const modals = document.getElementsByClassName("modal");
    if (modals.length > 0) {
        modals[0].style.display = "none";
        modals[0].remove();
    }
}
