((inputBook) => {
  let e = [];
  function t(t) {
    t.preventDefault();
    const n = document.querySelector("#inputBookTitle"),
      o = document.querySelector("#inputBookAuthor"),
      d = document.querySelector("#inputBookYear"),
      i = document.querySelector("#inputBookIsComplete"),
      c = {
        id: +new Date(),
        title: n.value,
        author: o.value,
        year: d.value,
        isComplete: i.checked,
      };
    console.log(c), e.push(c), document.dispatchEvent(new Event("bookChanged"));
  }
  function n(t) {
    t.preventDefault();
    const n = document.querySelector("#searchBookTitle");
    (query = n.value),
      query
        ? c(
            e.filter(function (e) {
              return e.title.toLowerCase().includes(query.toLowerCase());
            })
          )
        : c(e);
  }
  function o(t) {
    const n = Number(t.target.id),
      o = e.findIndex(function (e) {
        return e.id === n;
      });
    -1 !== o &&
      ((e[o] = {
        ...e[o],
        isComplete: !0,
      }),
      document.dispatchEvent(new Event("bookChanged")));
  }
  function d(t) {
    const n = Number(t.target.id),
      o = e.findIndex(function (e) {
        return e.id === n;
      });
    -1 !== o &&
      ((e[o] = {
        ...e[o],
        isComplete: !1,
      }),
      document.dispatchEvent(new Event("bookChanged")));
  }
  function i(t) {
    const n = Number(t.target.id),
      o = e.findIndex(function (e) {
        return e.id === n;
      });
    -1 !== o &&
      (e.splice(o, 1), document.dispatchEvent(new Event("bookChanged")));
  }

  //buku yang proses selesai dan belum selesai
  function c(e) {
    const t = document.querySelector("#incompleteBookshelfList"),
      n = document.querySelector("#completeBookshelfList");
    (t.innerHTML = ""), (n.innerHTML = "");
    for (const c of e) {
      const e = document.createElement("article");
      e.classList.add("book_item");
      const a = document.createElement("h2");
      a.innerText = c.title;
      const u = document.createElement("p");
      u.innerText = "Author: " + c.author;
      const r = document.createElement("p");
      if (
        ((r.innerText = "Year: " + c.year),
        e.appendChild(a),
        e.appendChild(u),
        e.appendChild(r),
        c.isComplete)
      ) {
        const t = document.createElement("div");
        t.classList.add("action");
        const o = document.createElement("button");
        (o.id = c.id),
          (o.innerText = "Belum dibaca"),
          o.classList.add("green"),
          o.addEventListener("click", d);
        const a = document.createElement("button");

        (a.id = c.id),
          (a.innerText = "Hapus 🗑️"),
          a.classList.add("red"),
          a.addEventListener("click", i);

        // Tambahkan tombol Edit
        const editButton = document.createElement("button");
        editButton.id = c.id;
        editButton.innerText = "Edit ✏️";
        editButton.classList.add("blue");
        editButton.addEventListener("click", function () {
          editBook(c.id);
        });

        t.appendChild(o),
          t.appendChild(a),
          t.appendChild(editButton), // Tambahkan tombol Edit ke dalam div
          e.appendChild(t),
          n.appendChild(e);
      } else {
        const n = document.createElement("div");
        n.classList.add("action");
        const d = document.createElement("button");
        (d.id = c.id),
          (d.innerText = "Sudah dibaca"),
          d.classList.add("green"),
          d.addEventListener("click", o);
        const a = document.createElement("button");
        (a.id = c.id),
          (a.innerText = "Hapus 🗑️"),
          a.classList.add("red"),
          a.addEventListener("click", i);

        // Tambahkan tombol Edit
        const editButton = document.createElement("button");
        editButton.id = c.id;
        editButton.innerText = "Edit ✏️";
        editButton.classList.add("blue");
        editButton.addEventListener("click", function () {
          editBook(c.id);
        });
        n.appendChild(d),
          n.appendChild(a),
          n.appendChild(editButton), 
          e.appendChild(n),
          t.appendChild(e);
      }
    }
  }

  // Fungsi editBook untuk mengedit buku
  function editBook(bookId) {
    const book = e.find((b) => b.id === bookId); // Cari buku berdasarkan ID
    if (book) {
      const newTitle = prompt("Edit judul:", book.title);
      const newAuthor = prompt("Edit Penulis:", book.author);
      const newYear = prompt("Edit Tahun:", book.year);

      // Jika user mengisi field baru, perbarui data buku
      if (newTitle !== null && newTitle.trim() !== "") {
        book.title = newTitle;
      }
      if (newAuthor !== null && newAuthor.trim() !== "") {
        book.author = newAuthor;
      }
      if (newYear !== null && newYear.trim() !== "") {
        book.year = newYear;
      }

      // Render ulang daftar buku setelah perubahan
      c(e);
    }
  }

  // cari data buku
  function a() {
    !(function (e) {
      localStorage.setItem("books", JSON.stringify(e));
    })(e),
      c(e);
  }
  window.addEventListener("load", function () {
    (e = JSON.parse(localStorage.getItem("books")) || []), c(e);
    const o = document.querySelector("#inputBook"),
      d = document.querySelector("#searchBook");
    o.addEventListener("submit", t),
      d.addEventListener("submit", n),
      document.addEventListener("bookChanged", a);
  });
})();
