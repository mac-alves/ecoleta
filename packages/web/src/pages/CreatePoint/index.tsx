import React, { useEffect, useState, useCallback, ChangeEvent, FormEvent} from 'react';
import './CreatePoint.css';
import { Container } from './styles';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import logo from '../../assets/img/logo.svg';
import { api, axios } from '../../services/api';
import { LeafletMouseEvent } from 'leaflet';
import ModalChecked from '../../components/ModalChecked';
import DropZone from '../../components/DropZone';

interface Item {
  id: number;
  image_url: string;
  name: string
}

interface UF {
  id: number;
  name: string;
}

const CreatePoint: React.FC = () => {
  const [ items, setItems ] = useState<Item[]>([]);
  const [ ufs, setUfs ] = useState<UF[]>([]);
  const [ selectedUf, setSelectedUf ] = useState<string>('0');
  const [ cities, setCities ] = useState<string[]>([]);
  const [ selectedCity, setSelectedCity ] = useState<string>();
  const [ selectedPosition, setSelectedPosition ] = useState<[number, number]>([ 0, 0 ]);
  const [ initialPosition, setInitialPosition ] = useState<[number, number]>([ -2.5004548, -44.2763225 ]);
  const [ selectedItems, setSelectedItems ] = useState<number[]>([]);
  const [ selectedFile, setSelectedFile ] = useState<File>();
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    whatsapp: ''
  });
  const [ submitOk, setSubmitOk ] = useState(false);

  const getItems = useCallback(async () => {
    const response = await api.get('items');
    setItems(response.data);
  }, []);

  const getUfs = useCallback(async () => {
    const ufs = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

    setUfs(ufs.data.map((uf: any) => {
      return {
        id: uf.id,
        name: uf.sigla
      }
    }));    
  }, []);

  const getCounty = useCallback(async () => {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);

    setCities(response.data.map((county: any) => county.nome));
  }, [selectedUf]);

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUf(event.target.value);
  }

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  }

  const handleMapClick = (event: LeafletMouseEvent) => {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]:value })
  }

  const handleSelectItem = (idItem: number) => {
    const item = selectedItems.findIndex(item => item === idItem);

    if (item >= 0){
      setSelectedItems(items => items.filter(item => item !== idItem))

    } else {
      setSelectedItems([...selectedItems, idItem])
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('whatsapp', formData.whatsapp);
    data.append('uf', selectedUf);
    data.append('city', String(selectedCity));
    data.append('latitude', String(selectedPosition[0]));
    data.append('longitude', String(selectedPosition[1]));
    data.append('items', selectedItems.join(','));
    
    if (selectedFile){
      data.append('image', selectedFile);
    }

    try {
      const response = await api.post('points', data);
      console.log(response);
      
      if (response.data.id){
        setSubmitOk(true);
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude])
    });
  }, []);

  useEffect(() => {
    getUfs();
    getItems();    
  }, [getItems, getUfs]);

  useEffect(() => {
    if (selectedUf !== '0'){
      getCounty();
    }    
  }, [getCounty, selectedUf]);

  return (
    <Container id="page-create-point">
        <header>
          <img src={logo} alt=""/>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>Cadastro do <br/> ponto de coleta</h1>

          <DropZone onFileUpload={setSelectedFile} />

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input 
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}/>
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}/>
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input 
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione um endereço no mapa</span>
            </legend>

            <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition}></Marker>
            </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Estado (UF)</label>
                <select 
                  name="uf" 
                  id="uf" 
                  onChange={handleSelectUf}
                  value={selectedUf}>

                  <option value="0">Selecione uma UF</option>
                  {ufs.map(uf => (
                    <option key={uf.id} value={uf.name}>{uf.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="cidade">Cidade</label>
                <select 
                  name="cidade" 
                  id="cidade" 
                  onChange={handleSelectCity} 
                  value={selectedCity}>

                  <option value="0">Selecione uma Cidade</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens de coleta</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
              {items.map(item => (
                <li 
                  key={item.id} 
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected': '' }>
                  <img src={item.image_url} alt={item.name}/>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">
            Cadastrar ponto de coleta
          </button>
        </form>

        {submitOk && <ModalChecked title="Cadastro concluído!" /> }
    </Container>
  );
}

export default CreatePoint;