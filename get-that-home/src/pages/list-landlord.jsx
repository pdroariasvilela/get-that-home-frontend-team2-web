import styled from "@emotion/styled";
import LanlordNavBar from "../components/navBar/lanlordNavBar";
import ListProperties from "./list-properties";
import { useState, useEffect, useContext } from "react";
import { getProperties } from "../service/properties-service";
import RentalCard from "../components/rental-card";
import FooterContent from "../components/footer";
import { Link } from "react-router-dom";
import { filterContext } from "../context/filter-contex";


const ContainerCards = styled.div`
  margin: 2rem auto;
  width: 75rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2rem;
`;

const ListLandLord = () => {
    const [properties, setProperties] = useState(null);
    const {min, max, isChecked, isCheckedApartment} = useContext(filterContext);
    const [staticProperties, setStaticProperties] = useState(null)
  
    useEffect(() => {
      getProperties().then(setProperties).catch(console.log);
      getProperties().then(setStaticProperties).catch(console.log);
    }, []);
  
    let filterProperties = properties ? properties.filter(product => product.price >= parseInt(min) && product.price <= parseInt(max)) : [];
    console.log(isChecked);
  
    useEffect(()=>{
      if(isChecked){
        setProperties(filterProperties.filter((product)=>product.property_type == "Casa"))
        console.log(properties)
        filterProperties = properties;
      }else if(isCheckedApartment){
        setProperties(filterProperties.filter((product)=>product.property_type == "Apartamento"))
        console.log(properties)
        filterProperties = properties;
      }
      else{
        setProperties(staticProperties)
      }
    }, [isChecked, isCheckedApartment])
  
 
  return (
    <div>
      <LanlordNavBar />
      <ListProperties />
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "50px" }}>
        <ContainerCards>
        {filterProperties?.map((product) => {
            return(
              <Link to={"/property-not-logged"} key={product.id} style={{textDecoration: "none"}}>
                <RentalCard  {...product}></RentalCard>;
              </Link> 
            )
          })}
        </ContainerCards>
      </div>
      <FooterContent />
    </div>
  );
};

export default ListLandLord;
