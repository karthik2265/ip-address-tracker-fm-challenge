// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

// api responce

// {
//     "ip": "2405:201:c001:607b:6ddb:b3d5:8f07:fc65",
//     "location": {
//         "country": "IN",
//         "region": "State of Andhra Pradesh",
//         "city": "Guntur",
//         "lat": 16.29974,
//         "lng": 80.45729,
//         "postalCode": "",
//         "timezone": "+05:30",
//         "geonameId": 1270668
//     },
//     "isp": "Reliance Jio Infocomm Limited"
// }
