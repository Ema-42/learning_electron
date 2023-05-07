
// const nodeDiskInfo = require('node-disk-info');

// // async way
// nodeDiskInfo.getDiskInfo()
//     .then(disks => {
//         printResults('ASYNC WAY', disks);
//     })
//     .catch(reason => {
//         console.error(reason);
//     });

// // sync way
// try {
//     const disks = nodeDiskInfo.getDiskInfoSync();
//     printResults('SYNC WAY', disks);
// } catch (e) {
//     console.error(e);
// }

// function printResults(title, disks) {

//     console.log(`============ ${title} ==============\n`);

//     for (const disk of disks) {
//         if (disk.filesystem !='tmpfs') {
//             console.log('Filesystem:', disk.filesystem);
//             console.log('Blocks:', disk.blocks);
//             console.log('Used:', disk.used);
//             console.log('Available:', disk.available);
//             console.log('Capacity:', disk.capacity);
//             console.log('Mounted:', disk.mounted, '\n');
//         }
//     }

// }



// const address = require('address');

// address((err, addrs) => {
//     console.log(addrs.ip, addrs.ipv6, addrs.mac);
//     // '192.168.0.2', 'fe80::7aca:39ff:feb0:e67d', '78:ca:39:b0:e6:7d'
//   });

// // local loopback
// address.ip('lo'); // '127.0.0.1'

// console.log(address.ip('lo'));



const si = require('systeminformation');

// promises style - new since version 3
si.cpu()
  .then(data => console.log(data.manufacturer))
  .catch(error => console.error(error));