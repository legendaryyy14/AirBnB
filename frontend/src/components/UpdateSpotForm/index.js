import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchUserSpots, createSpotImage, editSpot } from "../../store/spots";

const UpdateSpotForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const {spotId } = useParams();
  const spot = useSelector((state) => state.spots[spotId]);
  const history = useHistory();


  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);
  const [urls, setUrls] = useState(["something"]);
  const [errors, setErrors] = useState({});

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateUrls = (e) => {
    const newValue = e.target.value;
    setUrls([...urls, newValue]);
  };


  useEffect(() => {
    dispatch(fetchUserSpots());
    const errors = {};

    if (!address.length) errors.address = "Address is required";
    if (!city.length) errors.city = "City is required";
    if (!state.length) errors.state = "State is required";
    if (!country.length) errors.country = "Country is required";
    if (!name.length) errors.name = "Name is required";
    if (description.length < 30) errors.description = "Description must be at least 30 characters long";
    if (!price) errors.price = "Price per night is required";
    // if (!urls.length) errors.urls = "Preview image is required"

    setErrors(errors);
  }, [dispatch, spotId, address, city, state, country, name, description, price, urls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      id: spotId,
      ownerId: sessionUser.id,
      address,
      city,
      state,
      country,
      name,
      description,
      price,
      lat: 12.292,
      lng: 45.374
    };

    let updatedSpot = await dispatch(editSpot(payload));

    // console.log("CONSOLE LOG ===>", spotImagesPromises);

    if (updatedSpot && updatedSpot.id) {
      const validUrls = urls.filter(url => isValidImageUrl(url));

      if (validUrls.length === 0) {
            setErrors({image: "Image URL must end in .png, .jpg, or .jpeg"});
            return
        }

        const spotImagesPromises = urls.map(async (url, index) => {
        const imagesPayload = {
          url,
          preview: index === 0, // Set preview to true for the first image, false for others
          spotId: Number(updatedSpot.id),
        };

        return await dispatch(createSpotImage(updatedSpot.id, imagesPayload));
      });

      // Wait for all spot image creation promises to resolve
      const createdImages = await Promise.all(spotImagesPromises);

      if (createdImages.every((image) => !!image)) {
        history.push(`/spots/${updatedSpot.id}`);
      }
    }
  };

  const isValidImageUrl = (url) => {
    const validExtensions = [".png", ".jpg", ".jpeg"];
    const lowerCaseUrl = url.toLowerCase();
    return validExtensions.some((ext) => lowerCaseUrl.endsWith(ext));
  };


  return (
    <div>
      <form className="edit-spot-form" onSubmit={handleSubmit}>
        <section className="location">
          <h2>Update your Spot</h2>
          <p>Where's your place located?</p>
          <p>
            Guests will only get your exact address once they booked a
            reservation.
          </p>

          <label>
            Country
            <p className="errors">{errors.country}</p>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={updateCountry}
            />
          </label>

          <label>
            Street address
            <p className="errors">{errors.address}</p>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={updateAddress}
            />
          </label>

          <label>
            City
            <p className="errors">{errors.city}</p>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity}
            />
          </label>

          <label>
            State
            <p className="errors">{errors.state}</p>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={updateState}
            />
          </label>
        </section>

        <section className="description">
          <h2>Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <input
            type="text"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={updateDescription}
          />
          <p className="errors">{errors.description}</p>
        </section>

        <section className="spot-title">
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type="text"
            placeholder="Name of your spot"
            value={name}
            onChange={updateName}
          />
          <p className="errors">{errors.name}</p>
        </section>

        <section className="spot-price">
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <input
            type="number"
            placeholder="Price per night (USD)"
            value={price}
            onChange={updatePrice}
          />
          <p className="errors">{errors.price}</p>
        </section>

        <section className="spot-images">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={urls[0] || ""}
            onChange={updateUrls}
          />
          <p className="errors">{errors.urls}</p>
          <input
            type="text"
            placeholder="Image URL"
            value={urls[1] || ""}
            onChange={updateUrls}
          />
          <p className="errors">{errors.image}</p>
          <input
            type="text"
            placeholder="Image URL"
            value={urls[2] || ""}
            onChange={updateUrls}
          />
          <p className="errors">{errors.image}</p>
          <input
            type="text"
            placeholder="Image URL"
            value={urls[3] || ""}
            onChange={updateUrls}
          />
          <p className="errors">{errors.image}</p>
          <input
            type="text"
            placeholder="Image URL"
            value={urls[4] || ""}
            onChange={updateUrls}
          />
          <p className="errors">{errors.image}</p>
        </section>

        <button type="submit" disabled={!country || !address || !city || !state || !description || !name || !price || !urls[0] }>Update your Spot</button>

      </form>
    </div>
  );
};

export default UpdateSpotForm;
