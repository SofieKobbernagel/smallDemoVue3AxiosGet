const baseUrl = "http://localhost:5180/api/cars"

const app = Vue.createApp({
    data() {
        return {
            intro: 'Cars Vue App',
            carList:[],
            // MASTER / ORIGINAL liste (uafhængig kopieret fra serveren el. opdateret ved post)
            originalCars: [],
            carVendor: '',
            carModel: '',
            carPrice: 0,
            statuskode:'',
        }
    },
    methods: {
       // Hent alle biler — opdater både originalCars og carList
        getAllCars(){
            console.log("getAllCars");
            axios.get(baseUrl)
            .then(response => {
                console.log(response);
                // antag response.data er en array af biler
                this.originalCars = response.data.slice(); // gem en kopi
                this.carList = response.data.slice();     // vis en kopi
                this.statuskode = response.status;
            })
            .catch(error => {
                console.log(error);
                this.statuskode = error.response ? error.response.status : 'Fejl';
            });
        },

        gemBil(){
            console.log("er i gemBil metoden");
            
            axios.post(baseUrl, {
               "vendor": this.carVendor,
               "model": this.carModel,
               "price": this.carPrice
        })
        .then(response => {
                console.log("Post response:", response);
                // Hvis API returnerer den gemte bil (med id), brug den. Ellers kan vi bygge en lokal kopi.
                const savedCar = response.data ? response.data : {
                    id: Date.now(), // fallback id
                    vendor: this.carVendor,
                    model: this.carModel,
                    price: Number(this.carPrice)
                };
                // tilføj til både original og visning
                this.originalCars.push(savedCar);
                this.carList.push(savedCar);
                this.statuskode = response.status ? response.status : this.statuskode;
                // ryd inputfelter hvis ønsket
                this.carVendor = '';
                this.carModel = '';
                this.carPrice = 0;
            })
        .catch(error => {
            console.log(error);
        })
        }
    },
    sortVendorAsc() {
        // alfabetisk på vendor, A til Z
        this.carList = this.carList.slice().sort((a, b) => {
            const va = (a.vendor || '').toString();
            const vb = (b.vendor || '').toString();
            return va.localeCompare(vb, undefined, { sensitivity: 'base' });
        });
    },

    sortVendorDesc() {
        // Z til A
        this.carList = this.carList.slice().sort((a, b) => {
            const va = (a.vendor || '').toString();
            const vb = (b.vendor || '').toString();
            return vb.localeCompare(va, undefined, { sensitivity: 'base' });
        });
    },
    sortPriceAsc() {
        // lav numerisk sortering (lavest til højest)
        this.carList = this.carList.slice().sort((a, b) => {
            const pa = Number(a.price) || 0;
            const pb = Number(b.price) || 0;
            return pa - pb;
        });
    },

    sortPriceDesc() {
        // højest til lavest
        this.carList = this.carList.slice().sort((a, b) => {
            const pa = Number(a.price) || 0;
            const pb = Number(b.price) || 0;
            return pb - pa;
        });
    },

    // Reset: genskab carList fra originalCars (masterkopien)
    resetSort() {
        this.carList = this.originalCars.slice();
    }
})
