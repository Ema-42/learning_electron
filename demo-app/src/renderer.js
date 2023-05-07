const os = require('os');
const http = require('http');
const systeminfo = require('systeminformation');






const convertirAGb = (memoria)=>{
    let ram = (memoria/(Math.pow(1024,3))).toFixed(2)
    return ram+' GB';
}

function obtenerIpLocal() {
    const ifaces = os.networkInterfaces();
    let ip;
    Object.keys(ifaces).forEach(ifname => {
      ifaces[ifname].forEach(iface => {
        if (iface.family === 'IPv4' && !iface.internal) {
          ip = iface.address;
        }
      });
    });
    return ip;
  }

const obtenerVelocidadDeNucleos = () =>{
  return os.cpus().map((x,i) => `  ${i+1} : ${x.speed} MHz\n `)
}

const obtenerTiempoActivo = () =>{
  return ((os.uptime()/60)).toFixed(0) +' Min. '+ (os.uptime()%60).toFixed(0) + ' Seg.'
}

const obtenerRamLibre = () =>{
  return convertirAGb(os.freemem())
}

const actualizarDatos = () =>{
  document.querySelector('#Velocidad-de-procesadores-logicos').innerHTML = obtenerVelocidadDeNucleos();
  document.querySelector('#Tiempo-activo').innerHTML = obtenerTiempoActivo();
  document.querySelector('#Memoria-Ram-Libre').innerHTML = obtenerRamLibre();
}

// opcional desde la importacion de systeminfo
const obtenerInfoCpu = async () =>{
  try {
    let data = await systeminfo.cpu();
    return data;
  } catch (error) {
    console.error('error funcion InfoCpu: ',error);
  }
  }

const obtenerInfoRed = async () =>{
  try {
    let networkInterfaces = await systeminfo.networkInterfaces();
    return networkInterfaces
  } catch (error) {
    console.error('error funcion InfoRed: ',error);
  }
  };

const obtenerInfoSistema = async () =>{
  try {
    let osInfo = await systeminfo.osInfo();
    return osInfo
  } catch (error) {
    console.error('error funcion InfoRed: ',error);
  }
  };

const obtenerInfoEquipo = async () =>{
  try {
    let system = await systeminfo.system();
    let chassis = await  systeminfo.chassis()
    return {system,chassis}
  } catch (error) {
    console.error('error funcion InfoRed: ',error);
  }
}

// continuar probrando metodos de systeminfo de npm desde 3. CPU

// let chassis =  systeminfo.chassis()
// .then((data) => {
//   console.log(data);
// }).catch((err) => {
//   console.log(err);
// });

const Datos = async ()=>{
  const cpuInfo = await obtenerInfoCpu();
  const redInfo = await obtenerInfoRed();
  const sistemaInfo = await obtenerInfoSistema();
  const equipoInfo = await obtenerInfoEquipo()

  datos = [
    ['EQUIPO',''],
    ['Fabricante', equipoInfo.system.manufacturer],
    ['Modelo', equipoInfo.system.model],
    ['Tipo', equipoInfo.chassis.type],
    ['SISTEMA',''],
    ['Sistema Operativo',process.platform],
    ['Sistema Operativo (op)',os.type()],
    ['Distribución de SO',sistemaInfo.distro],
    ['Versión específica',sistemaInfo.release],
    ['Usuario actual',os.userInfo().username],
    ['Nombre del Equipo',os.hostname],
    ['RAM',''],
    ['Total de memoria Ram',convertirAGb(os.totalmem())],
    ['Memoria Ram Libre',obtenerRamLibre()],
    ['CPU',''],
    ['Fabricante CPU',cpuInfo.manufacturer],
    ['Frecuencia CPU',cpuInfo.speed+' GHz'],
    ['Arquitectura de CPU',os.arch],
    ['Arquitectura y Tipo',os.machine()],
    ['Modelo de CPU',os.cpus()[0].model],
    ['Version del kernel del equipo',os.version()],
    ['No. de núcleos de CPU',cpuInfo.physicalCores],
    ['No. de procesadores logicos de CPU (hilos)',cpuInfo.cores],
    ['Velocidad de procesadores logicos',obtenerVelocidadDeNucleos()],
    ['RED',''],
    ['IP local',obtenerIpLocal()],
    ['Tipo de conexion (inalámbrico / con cable)',redInfo[1].type],
    ['IP publica','pendiente'],
    ['Direccion MAC',redInfo[1].mac],
    ['ALMACENAMIENTO', ''],
    ['Disco', 'pendiente'],
    ['OTROS DATOS',''],
    ['Tiempo activo',obtenerTiempoActivo()],
  ]
  return datos
}


const tablaDeDatos = document.querySelector('#tabla-de-datos')

Datos().then((datos) => {
  setInterval(actualizarDatos,1000)
  datos.forEach(element => {
    const newRow = tablaDeDatos.insertRow();

    const cell1 = newRow.insertCell(0);
    cell1.innerHTML = element[0];

    const cell2 = newRow.insertCell(1);
    cell2.id = element[0].replace(/\s+/g, '-');
    cell2.innerHTML = element[1];
});
}).catch((err) => {
  console.log('Algo salio mal :');
  console.log(err);
});





