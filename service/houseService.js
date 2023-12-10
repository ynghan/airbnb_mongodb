const { House } = require('../models/house');

async function createHouse(data) {
    // House 모델을 사용하여 새로운 숙소를 생성
    const house = new House(data);
    // 생성된 숙소를 데이터베이스에 저장
    await house.save();
}

async function getHousesByCondition(condition) {
    // 'condition'에 따라 검색
    // sort 메소드를 사용하여 가격과 별점을 기준으로 내림차순 정렬
    const houses = await House.find(condition).sort({price: -1, rating: -1});
    // 찾은 데이터 반환
    return houses;
}

async function getHouseDetail(id) {
    // _id를 사용하여 특정 숙소를 찾음
    const house = await House.findById(id);
    // 찾은 데이터 반환
    return house;
}

module.exports = {
    createHouse,
    getHousesByCondition,
    getHouseDetail
};
