<script setup lang="ts">
import axios from 'axios';

axios
    .request({
        method: 'POST',
        url: 'https://www.qbuzz.nl/api/website/graphql',
        headers: {
            'Content-Type': ' application/json',
            'User-Agent': ' PostmanRuntime/7.43.0',
            Accept: ' */*',
            'Cache-Control': ' no-cache',
            'Postman-Token': ' 4c42daf4-2c7b-4653-9c8d-89f803bd7d4d',
            Host: ' www.qbuzz.nl',
            'Accept-Encoding': ' gzip, deflate, br',
            Connection: ' keep-alive',
            'Content-Length': ' 1291',
        },
        data: `{"query":"query StopLineWrapperQuery(\r\n $dataOwner: DataOwner\r\n $internalId: String\r\n $direction: Int\r\n $website: String!\r\n $operatingDay: LocalDate\r\n) {\r\n routeDirection(dataOwner: $dataOwner, internalId: $internalId, direction: $direction) {\r\n additionalInfo(website: $website) {\r\n content\r\n layoutUrl\r\n imageUrl {\r\n type\r\n url\r\n }\r\n }\r\n routeTablePdf(operatingDay: $operatingDay)\r\n routeTable(operatingDay: $operatingDay) {\r\n notes {\r\n label\r\n text\r\n }\r\n schedules {\r\n name\r\n stops {\r\n stop {\r\n name\r\n place\r\n departure\r\n arrival\r\n stopplace {\r\n uri\r\n }\r\n }\r\n times {\r\n time\r\n labels\r\n punctuality\r\n disruptions {\r\n disruption: quay {\r\n disruptionId\r\n status\r\n }\r\n }\r\n }\r\n }\r\n }\r\n }\r\n }\r\n}","variables":{"dataOwner": "QBUZZ","internalId": "g509","direction": 1,"website": "GD","operatingDay": "2025-02-27T18:47:51.483Z"}}`,
    })
    .then((response) => {
        console.log(response.data);
    });
</script>
<template>Test</template>
