
import mealsImg from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header=props =>{
    return(
        <>
          <header className={classes.header}>
              <h1>Foodie</h1>
              <button><HeaderCartButton onClick={props.onShowCart}/></button>
          </header>
          <div className={classes['main-image']}>
              <img src={mealsImg} alt=""/>
          </div>
        </>
    )
}

export default Header;