document.addEventListener("alpine:init", () => {
  Alpine.data("product", () => ({
    items: [
      { id: 1, name: "Biji Coffee Indramayu", img: "22.jpg", price: 25000 },
      { id: 2, name: "Biji Coffee Subang", img: "23.jpg", price: 35000 },
      { id: 3, name: "Biji Coffee Bekasi", img: "24.jpg", price: 20000 },
      { id: 4, name: "Biji Coffee Cirebon", img: "25.jpg", price: 26000 },
      { id: 5, name: "Biji Coffee Cikampek", img: "26.jpg", price: 45000 },
      { id: 6, name: "Biji Coffee Sumedang", img: "27.jpg", price: 55000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        //jika barangnya sudah ada, cek apakah barang beda apa sama di cart
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, maka tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
        }
        });
      }
    },
    remove(id) {
        // ambil yang mau di remove
        const cartItem = this.items.find((item) => item.id === id);

        //jika item lebih dari 1
        if(cartItem.quantity > 1) {
            //telusuri 1 1
            this.items = this.items.map((item) => {
                //jika bukan barang yang di klik
                if(item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }

            })
        } else if (cartItem.quantity === 1) {
            //jika barang sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
        }
    }
})
});



// rupiah 
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }) .format(number)
};


