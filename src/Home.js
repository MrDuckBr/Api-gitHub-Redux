import { Button, Input, Col, Row, Form, Select, List, Card } from 'antd';
import axios from 'axios';
import React,{ useState } from 'react';
import { FaHeart, FaRegHeart} from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { favoritarAction, removerFavoritoAction } from "./store/actions/commonActions";
const url = "https://api.github.com/search/";

const Home = () =>{
	const [list,setList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [toogle,setToogle] = useState(false);
	const [option, setOption] = useState('repositories');
  	const { Option } = Select;
    const dispatch = useDispatch();
  const { favoritos } = useSelector((s) => s.common);


	function handleChange(value){
		setOption(value)
  	}
  
  async function onSubmit(values){
	setLoading(true);
	  const response = await axios.get(url+ option+'?q='+values.search);
	 
	  let array = [] 
	  const data = await response.data.items
	  if(option === 'repositories'){
		  
	  		
	  		data.forEach(element => {
				const repository = {
				id: new Date(),
				project: element.name,
				owner : element.owner.login,
				avatar : element.owner.avatar_url,
				star:false
				}
				array.push(repository);
		 	});
		}else{
            
	  		data.forEach(element => {
				const repository = {
				id: new Date(),
				project: element.login,
				owner : element.type,
				avatar : element.avatar_url,
				star:false
				}
				array.push(repository);
		 	});


		}

	  setList(array);
    console.log(list)
	setLoading(false);
	console.log('PASSEI AQUI')
  }



  function adicionarFav(item){
      
    console.log('item')
    console.log(item)  
    item.star = true;
    dispatch(favoritarAction(item));
    
  }
  
  function removerFav(item){
      console.log(item)
      item.star = false;
    dispatch(removerFavoritoAction(item));
}

function toogleList(){
    console.log(toogle)
	if(toogle === false){
        
		setToogle(true)
		
	}else{
		setToogle(false)
	}
}




  return (
    <Form onFinish={onSubmit}>
    	<Col>
    		<Row>
    			<Button onClick={toogleList}>Meus Favoritos</Button>
    		</Row>
    		<Row>
      			<Col>
      				<Select defaultValue="Opções" style={{ width: 120 }} onChange={handleChange}>
        				<Option value="repositories">Repositórios</Option>
						<Option value="users">Users</Option>
        			</Select>
      			</Col>
      			<Col sm={4}>
      				<Form.Item name="search">
    					<Input id="search"/>
    				</Form.Item>
    			</Col>
    			<Col>
    				<Button loading={loading} htmlType="submit">Buscar</Button>
    			</Col>
    		</Row>
			{toogle === false ?
			<List
			loading={loading}
            grid={{ gutter: 5, column: 5 }}
            dataSource={list}
			pagination={{
				//total: cont,
				pageSize: 30,
				//onChange: changePage,
			  }}
            renderItem={(item) => <List.Item>
				 <Card cover={<img alt="example" src={item.avatar} />}>
	   				<h3> {item.project}</h3>
	   				<p>{item.owner}</p>
					   {item.star === false ? 
					   <FaRegHeart onClick={() => adicionarFav(item)}/>: <FaHeart onClick={() => removerFav(item)}/>}
					   
	 			</Card>
			</List.Item>}
          />
			:
			<List
			loading={loading}
            grid={{ gutter: 5, column: 5 }}
            dataSource={favoritos}
			pagination={{
				//total: totalCount,
				pageSize: 30,
				//onChange: changePage,
			  }}
            renderItem={(item) => <List.Item>
				 <Card cover={<img alt="example" src={item.avatar} />}>
	   				<h3> {item.project}</h3>
	   				<p>{item.owner}</p>
					   {<FaHeart onClick={() => removerFav(item)}/>}
					   
	 			</Card>
			</List.Item>}
          />
			
			}
    	</Col>
    </Form>
    //
  )
}

export default Home;