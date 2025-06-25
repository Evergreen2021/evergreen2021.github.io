function save(nickname, gender) {
alert(gender);
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("gender", gender)
    }
}

function getData() {
    if (typeof(Storage) !== "undefined") {
     alert(localStorage.getItem("gender"));
    }
}
