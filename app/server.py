from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for('view_builds'))

@app.route('/view_builds')
def view_builds():
    for sb in saved_builds:
        totalprice = 0
        for bk, bv in sb.items():
            if type(bv) is dict:
                for k,v in bv.items():
                    if k == 'price':
                        totalprice += v
                        sb['totalcost'] = totalprice

    return render_template('view_builds.html', data=saved_builds) 

@app.route('/build/<int:build_id>')
def construct_build(build_id):
    global build
    global current_id
    if build_id > len(saved_builds) or build_id <=0:
        build ={
            "id": current_id,
            "name": "",
            "cpu": "",
            "cooler": "",
            "motherboard": "",
            "gpu": "",
            "psu": "",
            "ram": "",
            "storage": "",
            "case": "",
            "monitor": "",
            "totalcost": 0}
    else:
        build = saved_builds[build_id-1]
    return redirect(url_for('build'))

@app.route('/build', methods=['GET', 'POST'])
def build():
    if request.method == 'POST':
        global build
        global current_id

        json_data = request.data.split("_")

        if json_data[0] == "remove":
            build[json_data[1]] = ""
            return redirect(url_for('build')) 
        else:
            build["name"] = json_data[0]
            if build["id"] == current_id:
                saved_builds.append(build)
            
            current_id +=1
            build ={
                "id": current_id,
                "name": "",
                "cpu": "",
                "cooler": "",
                "motherboard": "",
                "gpu": "",
                "psu": "",
                "ram": "",
                "storage": "",
                "case": "",
                "monitor": "",
                "totalcost": 0
                }
        return redirect(url_for('view_builds'))

    return render_template('build.html', data=build) 

@app.route('/pick_item/<type>', methods=['GET', 'POST'])
def pick_item(type):
    if request.method == 'POST':
        global build
        global current_id

        json_data = request.data.split("_")

        if json_data[0] == "remove":
            build[json_data[1]] = ""
        else:
            temp = switch_type(type)
            build[type] = temp[int(json_data[0])-1]
        return redirect(url_for('build'))

    if switch_type(type) == "invalid":
        return redirect(url_for('build'))
    else:
        return render_template('pick_item.html', data=switch_type(type), build=build)
 
def switch_type(argument):
    switcher = {
        "cpu": cpu,
        "cooler": cooler,
        "motherboard": motherboard,
        "gpu": gpu,
        "psu": psu,
        "ram": ram,
        "storage": storage,
        "case": case,
        "monitor": monitor
    }
    return switcher.get(argument, "invalid")

current_id = 1

build ={
        "id": 1,
        "name": "",
        "cpu": "",
        "cooler": "",
        "motherboard": "",
        "gpu": "",
        "psu": "",
        "ram": "",
        "storage": "",
        "case": "",
        "monitor": "",
        "totalcost": 0
}
saved_builds = [
]

motherboard = [
    {
        "id": 1,
        "brand": "ASUS",
        "model": "ROG Maximus XI Hero Wi-Fi",
        "cputype": "intel",
        "socket": "lga1151",
        "ramtype": "ddr4",
        "ramspeed": 4400,
        "price": 290,
        "img": "mb/intel/ASUS ROG Maximus XI Hero Wi-Fi.png",
        "shop": "https://www.amazon.com/dp/B07HCXT591/"
    },
    {
        "id": 2,
        "brand": "ASUS",
        "model": "Prime Z370-A",
        "cputype": "intel",
        "socket": "lga1151",
        "ramtype": "ddr4",
        "ramspeed": 4400,
        "price": 330,
        "img": "mb/intel/ASUS Prime Z370-A.png",
        "shop": "https://www.amazon.com/dp/B075RJHN2D/"
    },
    {
        "id": 3,
        "brand": "MSI",
        "model": "Z390-A PRO",
        "cputype": "intel",
        "socket": "lga1151",
        "ramtype": "ddr4",
        "ramspeed": 4000,
        "price": 120,
        "img": "mb/intel/MSI Z390-A PRO.png",
        "shop": "https://www.amazon.com/dp/B07J6Z9KJ2/"
    },
    {
        "id": 4,
        "brand": "Gigabyte",
        "model": "Z390 AORUS PRO Wi-Fi",
        "cputype": "intel",
        "socket": "lga1151",
        "ramtype": "ddr4",
        "ramspeed": 4133,
        "price": 195,
        "img": "mb/intel/Gigabyte Z390 AORUS PRO Wi-Fi.png",
        "shop": "https://www.amazon.com/dp/B07HRZKPXM/"
    },
    {
        "id": 5,
        "brand": "Gigabyte",
        "model": "GA-AB350-GAMING 3",
        "cputype": "amd",
        "socket": "am4",
        "ramtype": "ddr4",
        "ramspeed": 3200,
        "price": 95,
        "img": "mb/amd_am4/Gigabyte GA-AB350-GAMING 3.png",
        "shop": "https://www.amazon.com/dp/B06VWHXK94/"
    },
    {
        "id": 6,
        "brand": "ASUS",
        "model": "ROG STRIX B450-F",
        "cputype": "amd",
        "socket": "am4",
        "ramtype": "ddr4",
        "ramspeed": 3200,
        "price": 120,
        "img": "mb/amd_am4/ASUS ROG STRIX B450-F.png",
        "shop": "https://www.amazon.com/dp/B07FKTZC4M/"
    },
    {
        "id": 7,
        "brand": "MSI",
        "model": "B450 TOMAHAWK",
        "cputype": "amd",
        "socket": "am4",
        "ramtype": "ddr4",
        "ramspeed": 3466,
        "price": 110,
        "img": "mb/amd_am4/MSI B450 TOMAHAWK.png",
        "shop": "https://www.amazon.com/dp/B07F7W5KJS/"
    },
    {
        "id": 8,
        "brand": "MSI",
        "model": "X399 GAMING PRO CARBON AC",
        "cputype": "amd",
        "socket": "tr4",
        "ramtype": "ddr4",
        "ramspeed": 3600,
        "price": 305,
        "img": "mb/amd_tr4/MSI X399 GAMING PRO CARBON AC.png",
        "shop": "https://www.amazon.com/dp/B074DHQR9N/"
    },
    {
        "id": 9,
        "brand": "ASRock",
        "model": "X399 Taichi",
        "cputype": "amd",
        "socket": "tr4",
        "ramtype": "ddr4",
        "ramspeed": 3600,
        "price": 330,
        "img": "mb/amd_tr4/ASRock X399 Taichi.png",
        "shop": "https://www.amazon.com/dp/B074J5R36W/"
    },
    {
        "id": 10,
        "brand": "Gigabyte",
        "model": "X399 AORUS PRO",
        "cputype": "amd",
        "socket": "tr4",
        "ramtype": "ddr4",
        "ramspeed": 3600,
        "price": 430,
        "img": "mb/amd_tr4/Gigabyte X399 AORUS PRO.png",
        "shop": "https://www.amazon.com/dp/B07G7CCG3N/"
    }
]
cpu = [
    {
        "id": 1,
        "brand": "Intel",
        "cputype": "intel",
        "model": "i9 9900K",
        "cores": 8,
        "clock": "3.6 GHz",
        "power": 95,
        "cooler": "no",
        "socket": "lga1151",
        "price": 495,
        "img": "cpu/i9.png",
        "shop": "https://www.amazon.com/dp/B005404P9I/"
    },
    {
        "id": 2,
        "brand": "Intel",
        "cputype": "intel",
        "model": "i7 9700K",
        "cores": 8,
        "clock": "3.6 GHz",
        "power": 95,
        "cooler": "no",
        "socket": "lga1151",
        "price": 405,
        "img": "cpu/i7.png",
        "shop": "https://www.amazon.com/dp/B07HHN6KBZ/"
    },
    {
        "id": 3,
        "brand": "Intel",
        "cputype": "intel",
        "model": "i7 8700",
        "cores": 6,
        "clock": "3.2 GHz",
        "power": 65,
        "cooler": "yes",
        "socket": "lga1151",
        "price": 295,
        "img": "cpu/i7.png",
        "shop": "https://www.amazon.com/dp/B07598HLB4/"
    },
    {
        "id": 4,
        "brand": "Intel",
        "cputype": "intel",
        "model": "i7 8700K",
        "cores": 6,
        "clock": "3.7 GHz",
        "power": 95,
        "cooler": "no",
        "socket": "lga1151",
        "price": 360,
        "img": "cpu/i7.png",
        "shop": "https://www.amazon.com/dp/B07598VZR8/"
    },
    {
        "id": 5,
        "brand": "Intel",
        "cputype": "intel",
        "model": "i5 9600K",
        "cores": 6,
        "clock": "3.7 GHz",
        "power": 95,
        "cooler": "no",
        "socket": "lga1151",
        "price": 265,
        "img": "cpu/i5.png",
        "shop": "https://www.amazon.com/dp/B07HHLX1R8/"
    },
    {
        "id": 6,
        "brand": "Intel",
        "cputype": "intel",
        "model": "i5 9400F",
        "cores": 6,
        "clock": "2.9 GHz",
        "power": 65,
        "cooler": "yes",
        "socket": "lga1151",
        "price": 155,
        "img": "cpu/i5.png",
        "shop": "https://www.amazon.com/dp/B07MRCGQQ4/"
    },
    {
        "id": 7,
        "brand": "AMD",
        "cputype": "amd",
        "model": "Ryzen 7 2700X",
        "cores": 8,
        "clock": "3.7 GHz",
        "power": 105,
        "cooler": "yes",
        "socket": "am4",
        "price": 280,
        "img": "cpu/ryzen7.png",
        "shop": "https://www.amazon.com/dp/B07B428M7F/"
    },
    {
        "id": 8,
        "brand": "AMD",
        "cputype": "amd",
        "model": "Ryzen 7 1800X",
        "cores": 8,
        "clock": "3.6 GHz",
        "power": 95,
        "cooler": "no",
        "socket": "am4",
        "price": 210,
        "img": "cpu/ryzen7.png",
        "shop": "https://www.amazon.com/dp/B06W9JXK4G/"
    },
    {
        "id": 9,
        "brand": "AMD",
        "cputype": "amd",
        "model": "Ryzen 5 2600X",
        "cores": 6,
        "clock": "3.6 GHz",
        "power": 95,
        "cooler": "yes",
        "socket": "am4",
        "price": 175,
        "img": "cpu/ryzen5.png",
        "shop": "https://www.amazon.com/dp/B07B428V2L/"
    },
    {
        "id": 10,
        "brand": "AMD",
        "cputype": "amd",
        "model": "Threadripper 2950X",
        "cores": 16,
        "clock": "3.5 GHz",
        "power": 180,
        "cooler": "no",
        "socket": "tr4",
        "price": 820,
        "img": "cpu/ryzenTR.png",
        "shop": "https://www.amazon.com/dp/B07GFN6CVF/"
    },
    {
        "id": 11,
        "brand": "AMD",
        "cputype": "amd",
        "model": "Threadripper 1920X",
        "cores": 12,
        "clock": "3.5 GHz",
        "power": 180,
        "cooler": "no",
        "socket": "tr4",
        "price": 320,
        "img": "cpu/ryzenTR.png",
        "shop": "https://www.amazon.com/dp/B074CBJHCT/"
    }
]

ram = [
    {
        "id": 1,
        "brand": "Corsair",
        "model": "Vengeance LPX 16 GB",
        "ramtype": "ddr4",
        "ramspeed": 3200,
        "modules": "2x8GB",
        "price": 100,
        "img": "ram/corsair_vengeance.png",
        "shop": "https://www.amazon.com/dp/B0134EW7G8/"
    },
    {
        "id": 2,
        "brand": "Corsair",
        "model": "Vengeance LPX 32 GB",
        "ramtype": "ddr4",
        "ramspeed": 3200,
        "modules": "2x16GB",
        "price": 190,
        "img": "ram/corsair_vengeance.png",
        "shop": "https://www.amazon.com/dp/B016ORTNI2/"
    },
    {
        "id": 3,
        "brand": "Crucial",
        "model": "Ballistix Sport AT 16 GB",
        "ramtype": "ddr4",
        "ramspeed": 3000,
        "modules": "2x8GB",
        "price": 89,
        "img": "ram/crucial ballistix sport.png",
        "shop": "https://www.amazon.com/dp/B07F6JPLJ2/"
    },
    {
        "id": 4,
        "brand": "Crucial",
        "model": "Ballistix Sport LT 32 GB",
        "ramtype": "ddr4",
        "ramspeed": 3200,
        "modules": "2x16GB",
        "price": 180,
        "img": "ram/crucial_ballistix.png",
        "shop": "https://www.amazon.com/dp/B07M5RKH5Z/"
    },
    {
        "id": 5,
        "brand": "G.Skill",
        "model": "Trident Z RGB 16 GB",
        "ramtype": "ddr4",
        "ramspeed": 3000,
        "modules": "2x8GB",
        "price": 125,
        "img": "ram/gskill_trident.png",
        "shop": "https://www.amazon.com/dp/B01MTDEYHU/"
    }
]

cooler = [
    {
        "id": 1,
        "brand": "Corsair",
        "model": "H 100i v2",
        "type": "Liquid",
        "price": 205,
        "img": "cooler/h100i.png",
        "shop": "https://www.amazon.com/dp/B019EXSSBG/"
    },
    {
        "id": 2,
        "brand": "Noctua",
        "model": "NH-U12S",
        "type": "Heatsink",
        "price": 58,
        "img": "cooler/NH-U12S.png",
        "shop": "https://www.amazon.com/dp/B00C9EYVGY/"
    },
    {
        "id": 3,
        "brand": "Cooler Master",
        "model": "Hyper 212 EVO",
        "type": "Heatsink",
        "price": 35,
        "img": "cooler/Hyper 212 EVO.png",
        "shop": "https://www.amazon.com/dp/B005O65JXI/"
    }
]

gpu = [
    {
        "id": 1,
        "type": "nVidia",
        "brand": "Asus",
        "model": "RTX 2080 Ti",
        "memory": "11GB",
        "clock": "1350MHz",
        "power": 250,
        "price": 1345,
        "img": "gpu/asus_rtx2080ti.png",
        "shop": "https://www.amazon.com/dp/B07HY6QWXN/"
    },
    {
        "id": 2,
        "type": "nVidia",
        "brand": "Gigabyte",
        "model": "RTX 2070",
        "memory": "8GB",
        "clock": "1620MHz",
        "power": 185,
        "price": 480,
        "img": "gpu/gigabyte_rtx2070.png",
        "shop": "https://www.amazon.com/dp/B07JBTS8HR/"
    },
    {
        "id": 3,
        "type": "nVidia",
        "brand": "MSI",
        "model": "GTX 1660ti",
        "memory": "6GB",
        "clock": "1500MHz",
        "power": 120,
        "price": 280,
        "img": "gpu/msi_1660ti.png",
        "shop": "https://www.amazon.com/dp/B07N824KNV/"
    },
    {
        "id": 4,
        "type": "nVidia",
        "brand": "Gigabyte",
        "model": "GTX 1050",
        "memory": "2GB",
        "clock": "1379MHz",
        "power": 75,
        "price": 130,
        "img": "gpu/gigabyte_gtx1050.png",
        "shop": "https://www.amazon.com/dp/B01MG0733A/"
    },
    {
        "id": 5,
        "type": "nVidia",
        "brand": "Gigabyte",
        "model": "GT 1030",
        "memory": "2GB",
        "clock": "1252MHz",
        "power": 30,
        "price": 96,
        "img": "gpu/gigabyte_gt1030.png",
        "shop": "https://www.amazon.com/dp/B072HRD3CY/"
    },
    {
        "id": 6,
        "type": "AMD",
        "brand": "MSI",
        "model": "Radeon RX 580",
        "memory": "8GB",
        "clock": "1257MHz",
        "power": 185,
        "price": 200,
        "img": "gpu/rx580.png",
        "shop": "https://www.amazon.com/dp/B06XZQMMHJ/"
    },
    {
        "id": 7,
        "type": "AMD",
        "brand": "Gigabyte",
        "model": "Radeon RX 570",
        "memory": "8GB",
        "clock": "1168MHz",
        "power": 150,
        "price": 160,
        "img": "gpu/gigabyte_rx570.png",
        "shop": "https://www.amazon.com/dp/B06Y43ZKFF/"
    }
]

psu = [
    {
        "id": 1,
        "brand": "EVGA",
        "model": "SuperNOVA 550",
        "watts": 550,
        "price": 80,
        "img": "psu/evga_550.png",
        "shop": "https://www.amazon.com/dp/B01LWTS2UL/"
    },
    {
        "id": 2,
        "brand": "EVGA",
        "model": "SuperNOVA 650",
        "watts": 650,
        "price": 100,
        "img": "psu/evga_650.png",
        "shop": "https://www.amazon.com/dp/B01LYGFRL6/"
    },
    {
        "id": 3,
        "brand": "EVGA",
        "model": "SuperNOVA 750",
        "watts": 750,
        "price": 110,
        "img": "psu/evga_750.png",
        "shop": "https://www.amazon.com/dp/B005BE058W/"
    },
    {
        "id": 4,
        "brand": "EVGA",
        "model": "SuperNOVA 850",
        "watts": 850,
        "price": 138,
        "img": "psu/evga_850.png",
        "shop": "https://www.amazon.com/dp/B01LY4OJYJ/"
    }
]

storage = [
    {
        "id": 1,
        "brand": "Western Digital",
        "model": "Caviar Blue",
        "type": "hdd",
        "size": "1TB",
        "interface": "sata",
        "price": 50,
        "img": "storage/wd_hdd.png",
        "shop": "https://www.amazon.com/dp/B0088PUEPK/"
    },
    {
        "id": 2,
        "brand": "Seagate",
        "model": "Barracuda",
        "type": "hdd",
        "size": "3TB",
        "interface": "sata",
        "price": 45,
        "img": "storage/seagate_hdd.png",
        "shop": "https://www.amazon.com/dp/B01IEKG4NE/"
    },
    {
        "id": 3,
        "brand": "Samsung",
        "model": "860 EVO",
        "type": "ssd",
        "size": "1TB",
        "interface": "sata",
        "price": 150,
        "img": "storage/samsung_ssd.png",
        "shop": "https://www.amazon.com/dp/B078DPCY3T/"
    },
    {
        "id": 4,
        "brand": "Samsung",
        "model": "970 EVO",
        "type": "m2-ssd",
        "size": "500GB",
        "interface": "m2",
        "price": 100,
        "img": "storage/samsung_m2.png",
        "shop": "https://www.amazon.com/dp/B07BN4NJ2J/"
    }
]

case = [
    {
        "id": 1,
        "model": "Crystal 570X RGB",
        "brand": "Corsair",
        "type": "ATX",
        "price": 160,
        "img": "case/corsair_crystal_rgb.png",
        "shop": "https://www.amazon.com/dp/B01LE0ZKR2/"
    },
    {
        "id": 2,
        "model": "200R",
        "brand": "Corsair",
        "type": "ATX",
        "price": 60,
        "img": "case/corsiar_black.png",
        "shop": "https://www.amazon.com/dp/B009GXZ8MM/"
    },
    {
        "id": 4,
        "model": "H500 Black",
        "brand": "NZXT",
        "type": "ATX",
        "price": 70,
        "img": "case/nzxt_black.png",
        "shop": "https://www.amazon.com/dp/B07C3DWCDC/"
    },
    {
        "id": 5,
        "model": "H500 White",
        "brand": "NZXT",
        "type": "ATX",
        "price": 70,
        "img": "case/nzxt_white.png",
        "shop": "https://www.amazon.com/dp/B07C3SQP9V/"
    }
]

monitor = [
    {
        "id": 1,
        "brand": "Acer",
        "model": "SB220Q",
        "size": "21",
        "refresh": "75hz",
        "response": "4ms",
        "panel": "IPS",
        "price": 90,
        "img": "monitor/acer_sb220q.png",
        "shop": "https://www.amazon.com/dp/B07CVL2D2S/"
    },
    {
        "id": 2,
        "brand": "Asus",
        "model": "ROG SWIFT PG27UQ",
        "size": "27",
        "refresh": "144hz",
        "response": "4ms",
        "panel": "IPS",
        "price": 435,
        "img": "monitor/asus_rog_swift.png",
        "shop": "https://www.amazon.com/dp/B07F1VGGLK/"
    },
    {
        "id": 3,
        "brand": "Asus",
        "model": "VG248QE",
        "size": "24",
        "refresh": "144hz",
        "response": "1ms",
        "panel": "TN",
        "price": 260,
        "img": "monitor/asus_vg248qe.png",
        "shop": "https://www.amazon.com/dp/B00B2HH7G0/"
    },
    {
        "id": 4,
        "brand": "BenQ",
        "model": "XL2540",
        "size": "24",
        "refresh": "240hz",
        "response": "1ms",
        "panel": "TN",
        "price": 450,
        "img": "monitor/benq_xl2540.png",
        "shop": "https://www.amazon.com/dp/B01MCYUV19/"
    }
]




if __name__ == '__main__':
   app.run(debug = True)




