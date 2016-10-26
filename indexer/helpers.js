const fetch = require('node-fetch');
var asyncWhile = require("async-while");

function getAffairs(pageNumber) {
  console.log('loading', `http://ws-old.parlament.ch/affairs?pageNumber=${pageNumber}&format=json`)
  return fetch(`http://cors-proxy.nzz.ch/http://ws-old.parlament.ch/affairs?pageNumber=${pageNumber}&format=json`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36" 
    }
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data
    })
    .catch(err => {
      console.log("ERROR", err)
    })
}

var loadAllAffairs = asyncWhile(function(data) {
  return data.hasNextPage;
}, function(data) {
  // loop content goes here 
  return getAffairs(data.pageNumber)
    .then(affairs => {
      for (let affair of affairs) {
        data.affairs.push(affair.id);
        if (affair.hasMorePages !== undefined) {
          data.hasNextPage = affair.hasMorePages;
        }
      }
// data.hasNextPage = false;
      data.pageNumber++;
      return data;
    })
});

const getAllAffairs = function() {
  return loadAllAffairs({pageNumber: 1, hasNextPage: true, affairs: []})
    .then(function(result) {
      return result.affairs;
    });
}

const getAffairDetail = function(affairId) {
  return fetch(`http://ws-old.parlament.ch/affairs/${affairId}?format=json`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36" 
    }
  })
    .then(response => {
      return response.json();
    })

}

module.exports = {
  getAllAffairs: getAllAffairs,
  getAffairDetail: getAffairDetail
}
