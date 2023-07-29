import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchSpots, createSpot } from '../../store/spots';
import * as sessionActions from '../../store/session';

const CreateSpotForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory();

    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ lat, setLat ] = useState(null);
    const [ lng, setLng ] = useState(null);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = ('');
    const [ errors, setErrors ] = useState({})

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);


    useEffect(() => {
        dispatch(fetchSpots())
        const errors = {};

        if (!address.length) errors.address = "Address is required";
        if (!city.length) errors.city = "City is required";
        if (!state.length) errors.state = "State is required";
        if (!country.length) errors.country = "Country is required";
        if (!name.length) errors.name = "Name is required";
        if (description.length < 30) errors.description = "Description must be at least 30 characters long";
        if (!price) errors.price = "Price per night is required";


        setErrors(errors);

    }, [dispatch, address, city, state, country, name, description, price])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const payload = {
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price
        };


            let createdSpot = await dispatch(createSpot(payload));
            if (createdSpot) {
                history.push(`/spots/${createSpot.id}`);
                hideForm();
            }

    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
      };

    return(
        <div>

            <form className='spot-form' onSubmit={handleSubmit}>
                <section className='location'>
                    <h2>Create a New Spot</h2>
                    <p>Where's your place located?</p>
                    <p>Guests will only get your exact address once they booked a reservation.</p>

                    <label>
                        Country
                    <p className='errors'>{errors.country}</p>
                    <input
                        type="text"
                        placeholder='Country'
                        value={country}
                        onChange={updateCountry}
                    />
                    </label>

                    <label>
                        Street address
                        <p className='errors'>{errors.address}</p>
                        <input
                            type='text'
                            placeholder='Address'
                            value={address}
                            onChange={updateAddress}
                        />
                    </label>

                    <label>
                        City
                        <p className='errors'>{errors.city}</p>
                        <input
                            type='text'
                            placeholder='City'
                            value={city}
                            onChange={updateCity}
                        />
                    </label>

                    <label>
                        State
                        <p className='errors'>{errors.state}</p>
                        <input
                            type='text'
                            placeholder='State'
                            value={state}
                            onChange={updateState}
                        />
                    </label>
                </section>

                <section className='description'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <input
                        type='text'
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={updateDescription}
                    />
                    <p className='errors'>{errors.description}</p>
                </section>

                <section className='spot-title'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        type='text'
                        placeholder='Name of your spot'
                        value={name}
                        onChange={updateName}
                    />
                    <p className='errors'>{errors.name}</p>
                </section>

                <section className='spot-price'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input
                        type='number'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={updatePrice}
                    />
                    <p className='errors'>{errors.price}</p>
                </section>



            </form>
        </div>

    )


}

export default CreateSpotForm;
