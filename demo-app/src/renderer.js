const os = require("os");
const fs = require("fs");
const systeminfo = require("systeminformation");
const { time } = require("console");

const convertirAGb = (memoria) => {
  let ram = (memoria / Math.pow(1024, 3)).toFixed(2);
  return ram + " GB";
};

function obtenerIpLocal() {
  let ifaces = os.networkInterfaces();
  let ip;
  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family === "IPv4" && !iface.internal) {
        ip = iface.address;
      }
    });
  });
  return ip;
}

const obtenerVelocidadDeNucleos = () => {
  return os.cpus().map((x, i) => `  ${i + 1} : ${x.speed} MHz\n `);
};

const obtenerTiempoActivo = () => {
  return (os.uptime() / 60).toFixed(0) + " Min. ";
};

// opcional desde la importacion de systeminfo
const obtenerInfoCpu = async () => {
  try {
    let data = await systeminfo.cpu();
    return data;
  } catch (error) {
    console.error("error funcion InfoCpu: ", error);
  }
};

const obtenerInfoRed = async () => {
  try {
    let networkInterfaces = await systeminfo.networkInterfaces();
    return networkInterfaces;
  } catch (error) {
    console.error("error funcion InfoRed: ", error);
  }
};

const obtenerInfoSistema = async () => {
  try {
    let osInfo = await systeminfo.osInfo();
    return osInfo;
  } catch (error) {
    console.error("error funcion InfoSistema: ", error);
  }
};

const obtenerInfoEquipo = async () => {
  try {
    let system = await systeminfo.system();
    let chassis = await systeminfo.chassis();
    return { system, chassis };
  } catch (error) {
    console.error("error funcion InfoEquipo: ", error);
  }
};

const obtenerInfoRam = async () => {
  try {
    let memLayout = await systeminfo.memLayout();
    let ranurasUsadas = 0;
    let infoRanuras = "";
    for (let i = 0; i < memLayout.length; i++) {
      if (memLayout[i].size) {
        ranurasUsadas++;
        infoRanuras += `    Ranura ${i + 1}:
        Marca: ${
          memLayout[i].manufacturer === "Unknown"
            ? "Desconocida"
            : memLayout[i].manufacturer
        }
        Capacidad: ${convertirAGb(memLayout[i].size)}
        Tipo: ${memLayout[i].type}
        Frecuencia: ${memLayout[i].clockSpeed} MHz
        Voltaje Máximo: ${memLayout[i].voltageMax + " V"}  |`;
      }
    }
    return { memLayout, ranurasUsadas, infoRanuras };
  } catch (error) {
    console.log("error infoRam", error);
  }
};

const obtenerInfoBateria = async () => {
  try {
    let battery = await systeminfo.battery();
    return battery;
  } catch (error) {
    console.error("error funcion InfoBateria: ", error);
  }
};

const obtenerInfoGraficos = async () => {
  try {
    let displays = (await systeminfo.graphics()).displays;
    let controllers = (await systeminfo.graphics()).controllers;
    let infoGPU = "";
    let infoPantalla = "";
    for (let i = 0; i < controllers.length; i++) {
      infoGPU += `    GPU ${i + 1}:
      Nombre: ${controllers[i].model}
      Fabricante: ${controllers[i].vendor}
      Capacidad: ${controllers[i].vram / 1024} GB  |`;
    }
    for (let i = 0; i < displays.length; i++) {
      infoPantalla += `   Pantalla ${i + 1}:
      Frecuencia: ${displays[i].currentRefreshRate} Hz
      Conexión: ${displays[i].connection}
      Resolución: ${
        displays[i].resolutionX + " x " + displays[i].resolutionY
      }  |`;
    }
    return { displays, infoPantalla, infoGPU };
  } catch (error) {
    console.error("error funcion InfoBateria: ", error);
  }
};

const obtenerInfoDisco = async () => {
  try {
    let disks = await systeminfo.diskLayout();
    let infoDisco = "";
    for (let i = 0; i < disks.length; i++) {
      infoDisco += ` --DISCO ${i + 1}--
        Nombre: ${disks[i].name}
        Capacidad: ${(disks[i].size / Math.pow(1024, 3)).toFixed(2)} GB
        Fabricante: ${disks[i].vendor}
        Interfaz: ${disks[i].interfaceType}
        Tipo: ${disks[i].type}  |`;
    }
    return { infoDisco };
  } catch (error) {
    console.error("error funcion InfoDisco: ", error);
  }
};

// continuar probrando metodos de systeminfo de getStaticData

let info = systeminfo
  .getStaticData()
  .then((data) => {
    console.log("getStaticData: ", data);
  })
  .catch((err) => {
    console.log(err);
  });

const actualizarDatos = async () => {
  const bateriaInfo = await obtenerInfoBateria();
  document.querySelector("#Frecuencia-de-procesadores-logicos").innerHTML =
    obtenerVelocidadDeNucleos();
  document.querySelector("#Tiempo-activo").innerHTML = obtenerTiempoActivo();
  document.querySelector("#Libre").innerHTML = convertirAGb(os.freemem());
  document.querySelector("#Porcentaje-de-bateria").innerHTML =
    bateriaInfo.percent + " %";
  document.querySelector("#En-uso").innerHTML = convertirAGb(
    os.totalmem() - os.freemem()
  );
};

const Datos = async () => {
  const cpuInfo = await obtenerInfoCpu();
  const redInfo = await obtenerInfoRed();
  const sistemaInfo = await obtenerInfoSistema();
  const equipoInfo = await obtenerInfoEquipo();
  const ramInfo = await obtenerInfoRam();
  const bateriaInfo = await obtenerInfoBateria();
  const graficosInfo = await obtenerInfoGraficos();
  const discoInfo = await obtenerInfoDisco();

  datos = [
    ["ESCRITORIO", ""],
    ["EQUIPO", ""],
    ["Fabricante", equipoInfo.system.manufacturer],
    ["Modelo", equipoInfo.system.model],
    ["Tipo", equipoInfo.chassis.type],
    ["SISTEMA", ""],
    [
      "Sistema Operativo",
      process.platform == "linux"
        ? "Linux"
        : process.platform == "darwin"
        ? "Mac OS"
        : process.platform == "win32"
        ? "Windows"
        : "",
    ],
    ["Distribución", sistemaInfo.distro],
    ["Versión específica", sistemaInfo.release],
    ["Usuario actual", os.userInfo().username],
    ["Nombre del Equipo", os.hostname()],
    ["PANTALLA", ""],
    ["Cantidad de monitores", graficosInfo.displays.length],
    ["Información monitores", graficosInfo.infoPantalla],
    ["Información GPU", graficosInfo.infoGPU],
    ["RAM", ""],
    ["Total", convertirAGb(os.totalmem())],
    ["En uso", convertirAGb(os.totalmem() - os.freemem())],
    ["Libre", convertirAGb(os.freemem())],
    ["Ranuras", ramInfo.memLayout.length],
    ["Ranuras en uso", ramInfo.ranurasUsadas],
    ["Información Ranuras", ramInfo.infoRanuras],
    ["CPU", ""],
    ["Fabricante CPU", cpuInfo.manufacturer],
    ["Frecuencia CPU", cpuInfo.speed + " GHz"],
    ["Arquitectura de CPU", os.arch()],
    ["Arquitectura y Tipo", os.machine()],
    ["Modelo de CPU", os.cpus()[0].model],
    ["Version del kernel del equipo", os.version()],
    ["N de núcleos de CPU", cpuInfo.physicalCores],
    ["N de procesadores logicos de CPU", cpuInfo.cores],
    ["Frecuencia de procesadores logicos", obtenerVelocidadDeNucleos()],
    ["RED", ""],
    ["IP local", obtenerIpLocal()],
    ["Tipo de conexion", redInfo[1].type],
    ["IP publica", "pendiente"],
    ["Direccion MAC", redInfo[1].mac],
    ["ALMACENAMIENTO", ""],
    ["Disco", discoInfo.infoDisco],
    ["OTROS DATOS", ""],
    ["Tiempo activo", obtenerTiempoActivo()],
    ["LAPTOP", ""],
    ["BATERIA", ""],
    ["Enchufada", bateriaInfo.acConnected ? "Si" : "No"],
    ["Porcentaje de bateria", bateriaInfo.percent + " %"],
    ["Voltaje actual de la bateria", bateriaInfo.voltage + " V"],
    ["Capacidad actual", bateriaInfo.currentCapacity + " mWh"],
  ];
  return datos;
};

const tablaDeDatos = document.querySelector("#tabla-de-datos");

Datos()
  .then((datos) => {
    setInterval(actualizarDatos, 1500);
    const objetoResultado = {};

    datos.forEach((element) => {
      //para usar desde db
      const llave = element[0]
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "");
      const valor = element[1];
      element[1]!=''?objetoResultado[llave] = valor:'';

      const newRow = tablaDeDatos.insertRow();
      const cell1 = newRow.insertCell(0);
      cell1.innerHTML = element[0];
      const cell2 = newRow.insertCell(1);
      cell2.id = element[0].replace(/\s+/g, "-");
      cell2.innerHTML = element[1];
    });
    const json = JSON.stringify(objetoResultado);
    const exportarInfoPc = ()=>{
      fs.writeFile(`src/db/pcInfo.json`, json, (error) => {
        error ? console.error(error) : "";
      })
    };
    exportarInfoPc()
    setInterval(exportarInfoPc, 600000);
  })
  .catch((err) => {
    console.log("Algo salio mal :",err);
  });
