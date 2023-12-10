const faker = require("faker");
const mongoose = require("mongoose");
const { Guest, House, Reservation } = require("./models");

generateDummyData = async (nGuest, nHouse, nReservation) => {
    const guests = [];
    const houses = [];
    const reservatioins = [];
    const db = mongoose.connection.db;

    console.log("drop all collections");
    const collections = await db.listCollections().toArray();
    collections
        .map((collection) => collection.name)
        .forEach(async (collectionName) => {
            db.dropCollection(collectionName);
        });
    console.log("Generating Dummy data");
    
    //게스트 생성
    for (let i = 0; i < nGuest; i++) {
        guests.push(
            new Guest({
                name: faker.internet.userName() + parseInt(Math.random() * 100),
                age: 20 + parseInt(Math.random() * 50),
                address: {
                    city: faker.address.city(),
                    street: faker.address.streetName(),
                    zipCode: faker.address.zipCode(),
                },
            })
        );
    }

    // 숙소 생성
    generateHouses(houses, nHouse);

    // let dates = faker.random.arrayElements(houses[0].dates, 2).map(dateObj => {
    //     console.log(dateObj.date);
    //     const date = new Date(dateObj.date);
    //     console.log(date);
    //     return date;
    // });
    // console.log(dates);
    

    // let dates = faker.random.arrayElements(houses[1].dates, 2).map(dateObj => {
    //     console.log(`Year: ${dateObj.date.year}, Month: ${dateObj.date.month}, Date: ${dateObj.date.date}`);
    //     const date = new Date(dateObj.date.year, dateObj.date.month - 1, dateObj.date.date);
    //     console.log(date);
    //     return date;
    // });
    
    // let dates = faker.random.arrayElements(houses[0].dates, 2).map(dateObj => {
    //     const date = new Date(dateObj.date.year, dateObj.date.month - 1, dateObj.date.date);
    //     console.log(date);
    //     return date;
    // });
    
    // 예약 생성
    // generateReservation(guests[0], houses[0], reservatioins, nReservation);

    //예약 상태 변경(후기 작성을 위함)



    // 후기 생성
    Guest, House, Reservation
    console.log("dummy data inserting....");
    await Guest.insertMany(guests);
    await House.insertMany(houses);
    // await Reservation.insertMany(reservatioins);
}

module.exports = { generateDummyData };


function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 * House 객체를 numHouses 수 만큼 생성한다.
 * 이때, dates.month(현재 달)에서 다음 달과 다다음 달의 dates를 생성하는 메소드
 */
async function generateHouses(houses, numHouses) {

    //dates 생성
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;  // JavaScript month is 0-indexed

    for (let i = 0; i < numHouses; i++) {
        const dates = [];
        const limit = faker.datatype.number({ min: 1, max: 10 });  // Generate limit once for each house

        for (let j = 0; j < 3; j++) {
            const month = currentMonth + j;
            const year = month > 12 ? currentYear + 1 : currentYear;  // If month > 12, increment year
            const actualMonth = month > 12 ? month - 12 : month;  // If month > 12, wrap around to January

            for (let k = 1; k <= getDaysInMonth(actualMonth, year); k++) {
                dates.push({
                    date: new Date(year, actualMonth - 1, k),
                    limit: limit,
                    status: faker.random.arrayElement(['oncomming', 'terminated'])
                });
            }
        }
        //House 생성
        houses.push(new House({
            type: faker.random.arrayElement(['entire', 'private']),
            // name: faker.company.companyName(),
            price: faker.datatype.number({min: 30000}),
            // rating: Array.from({length: 5}, () => faker.datatype.number({ min: 0, max: 5 })),
            address: {
                street: faker.address.streetName(),
                city: faker.address.city(),
                zipcode: faker.address.zipCode(),
            },
            amenities: Array.from({length: faker.datatype.number({ min: 1, max: 5 })}, () => faker.commerce.product()),
            dates: dates,
        }));
        // console.log(houses[i].dates);
    }
}

function generateReservation(guest, house, reservations, nReservation) {
    for(let i = 0; i < nReservation; i++) {
        // house의 dates 배열에서 두 개의 날짜를 무작위로 선택
        let dates = faker.random.arrayElements(house.dates, 2).map(dateObj => new Date(dateObj.date.year, dateObj.date.month - 1, dateObj.date.date));


        // 날짜를 오름차순으로 정렬하여 check_in과 check_out 날짜를 결정
        dates.sort((a, b) => a.getTime() - b.getTime());
        let check_in = dates[0];
        let check_out = dates[1];

        let reservation = new Reservation({
            guest: guest._id,
            house: house._id,
            num_people: faker.datatype.number({ min: 1, max: 10 }),
            check_in: {
                year: check_in.getFullYear(),
                month: check_in.getMonth() + 1, // JavaScript month is 0-indexed
                date: check_in.getDate(),
            },
            check_out: {
                year: check_out.getFullYear(),
                month: check_out.getMonth() + 1, // JavaScript month is 0-indexed
                date: check_out.getDate(),
            },
        });

        reservations.push(reservation);
    }
}


// /**
//  * 예약을 생성한다.
//  */
// async function generateReservation(guest1, house1, reservatioins, numberReservation) {
    
//     for (let i = 0; i < numberReservation; i++) {
        
//         const houseDates = house1.dates.map(dateObj => new Date(dateObj.year, dateObj.month - 1, dateObj.date));
//         const minDate = Math.min.apply(null, houseDates);
//         const maxDate = Math.max.apply(null, houseDates);
        
//         const checkInDate = new Date(faker.date.between(minDate, maxDate));
//         const checkOutDate = new Date(faker.date.between(checkInDate, maxDate));

//         reservatioins.push(new Reservation({
//             guest: guest1,
//             house: house1,
//             num_people: faker.datatype.number({ min: 1, max: 10 }),
//             check_in: { year: checkInDate.getFullYear(), month: checkInDate.getMonth() + 1, date: checkInDate.getDate() },
//             check_out: { year: checkOutDate.getFullYear(), month: checkOutDate.getMonth() + 1, date: checkOutDate.getDate() },
//         }));
//     }
// }



