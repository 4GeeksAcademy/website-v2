import React, { useState, useRef } from "react";
import countriesList from "./countriesList";
import InputMask from "react-input-mask";
import styled from "styled-components";
import { Colors } from "../../Styling";

const Msg = styled.span`
  position: absolute;
  top: -18px;
  left: 0px;
  padding: 3px;
  font-size: 12px;
  background-color: ${Colors.lightRed};
`;

const PhoneInput = ({
  defaultMask,
  phoneFormValues,
  prefix = "+",
  containerStyle,
  formData,
  style,
  inputStyle,
  buttonStyle,
  dropdownStyle,
  setVal,
  enableSearch = true,
  searchClass = "",
  disableSearchIcon = false,
  searchStyle,
  id,
  searchPlaceholder = "search",
  autocompleteSearch = false,
  searchNotFound = "No entries to show",
  sessionContextLocation,
  campusDial,
  setShowPhoneWarning,
  errorMsg = "Please specify a valid phone number",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    name: "United States",
    locations: ["downtown-miami"],
    iso2: "us",
    countryCode: "1",
    dialCode: "1",
  });
  const dropdownMenuRef = useRef();
  const [validStatus, setValidStatus] = useState({ valid: true });
  const regex = {
    phone: /^(?!(\d{2,})\1+)(?!(\d+)\2{3,})(\+\d{1,3})?(\d{8,10})$/,
  };
  let highlightCountryIndex = 0;

  const getCountryPhoneMask = () => {
    const maskList = [
      { us: `+${selectedCountry.dialCode || "1"} (999) 999-9999` },
      { cl: `+${selectedCountry.dialCode || "99"}9 9999 9999` },
      {
        default: defaultMask || `+${selectedCountry.dialCode} 999 999 999 999`,
      },
    ];
    const getMask = maskList.find(
      (code) => code[selectedCountry.iso2] || code["default"]
    );
    const mask = getMask[selectedCountry.iso2] || getMask["default"];
    return mask;
  };

  const rawCountries = JSON.parse(JSON.stringify(countriesList));
  let hiddenAreaCodes = [];

  const initializedCountries = [].concat(
    ...rawCountries.map((country) => {
      const countryItem = {
        name: country[0],
        locations: country[1],
        iso2: country[2],
        countryCode: country[3],
        dialCode: country[3],
        priority: country[5] || 0,
      };

      const areaItems = [];

      country[6] &&
        country[6].map((areaCode) => {
          const areaItem = { ...countryItem };
          areaItem.dialCode = country[3] + areaCode;
          areaItem.isAreaCode = true;
          areaItem.areaCodeLength = areaCode.length;

          areaItems.push(areaItem);
        });

      if (areaItems.length > 0) {
        countryItem.mainCode = true;
        hiddenAreaCodes = hiddenAreaCodes.concat(areaItems);
        return [countryItem];
      }

      return [countryItem];
    })
  );

  const getLocationCoincidence = (country, sessionLocation) => {
    if (country.name === sessionLocation.name)
      return setSelectedCountry(country);
    if (
      country.locations.some(
        (loc) => loc === sessionLocation.active_campaign_location_slug
      )
    )
      return setSelectedCountry(country);
    return false;
  };

  React.useEffect(() => {
    if (sessionContextLocation !== null && sessionContextLocation) {
      initializedCountries.find((country) => {
        getLocationCoincidence(country, sessionContextLocation);
      });
    }
  }, [sessionContextLocation]);

  React.useEffect(() => {
    const prefixCode = prefix + selectedCountry.dialCode;
    setPhoneNumber(prefixCode);
  }, [selectedCountry]);

  React.useEffect(() => {
    if (
      setShowPhoneWarning &&
      campusDial &&
      campusDial !== "" &&
      campusDial.dialCode !== selectedCountry.dialCode
    )
      setShowPhoneWarning(true);
    else if(setShowPhoneWarning) setShowPhoneWarning(false);
  }, [campusDial, selectedCountry]);

  const handleSearchChange = (e) => {
    const {
      currentTarget: { value: searchValue },
    } = e;
    setSearchValue(searchValue);
  };

  React.useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        showDropdown &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropdown]);

  const handleFlagDropdownClick = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const getSearchFilteredCountries = () => {
    const allCountries = initializedCountries;

    const sanitizedSearchValue = searchValue.trim().toLowerCase();
    if (enableSearch && sanitizedSearchValue) {
      // [...new Set()] to get rid of duplicates
      // firstly search by iso2 code
      if (/^\d+$/.test(sanitizedSearchValue)) {
        // contains digits only
        // values wrapped in ${} to prevent undefined
        return allCountries.filter(({ dialCode }) =>
          [`${dialCode}`].some((field) =>
            field.toLowerCase().includes(sanitizedSearchValue)
          )
        );
      } else {
        const iso2countries = allCountries.filter(({ iso2 }) =>
          [`${iso2}`].some((field) =>
            field.toLowerCase().includes(sanitizedSearchValue)
          )
        );

        const searchedCountries = allCountries.filter(
          ({ name, localName, iso2 }) =>
            [`${name}`, `${localName || ""}`].some((field) =>
              field.toLowerCase().includes(sanitizedSearchValue)
            )
        );
        return [...new Set([].concat(iso2countries, searchedCountries))];
      }
    } else {
      return allCountries;
    }
  };

  const handleFlagItemClick = (country, e) => {
    e.preventDefault();
    setSelectedCountry(country);
    setShowDropdown(false);
  };

  const handlePhoneInput = (e) => {
    let isValid = true;
    const prefixCode = prefix + selectedCountry.dialCode;

    // Gets the character of the formatted phone number
    const formatOfCharacters = e.target.value.match(/[^A-Za-z0-9 ]/g);
    let prefixLength = selectedCountry.isAreaCode
      ? prefixCode.length + formatOfCharacters.length
      : prefixCode.length;

    // remove the prefix and characters of the formated country from the target input
    const input = e.target.value.substr(prefixLength);
    setPhoneNumber(prefixCode + input);

    const cleanedPhoneInput = `+${(prefixCode + input).match(/\d+/g).join("")}`;

    isValid = regex.phone.test(cleanedPhoneInput);
    if (isValid !== validStatus) {
      setValidStatus({
        valid: isValid,
        msg: isValid ? "Ok" : errorMsg,
      });
    }
    setVal({
      ...formData,
      phone: { ...phoneFormValues, value: cleanedPhoneInput, valid: true },
    });
  };

  const searchedCountries = getSearchFilteredCountries();

  let countryDropdownList = searchedCountries.map((country, index) => {
    const highlight = highlightCountryIndex === index;
    return (
      <li
        key={`flag_no_${index}`}
        data-flag-key={`flag_no_${index}`}
        className={`country ${highlight ? "highlight" : ""}`}
        data-dial-code="1"
        tabIndex="-1"
        data-country-code={country.iso2}
        onClick={(e) => handleFlagItemClick(country, e)}
        role="option"
        {...(highlight ? { "aria-selected": true } : {})}
      >
        <div className={`flag ${country.iso2}`} />
        <span className="country-name">
          {country.localName || country.name}
        </span>
        <span className="dial-code">{prefix + country.dialCode}</span>
      </li>
    );
  });

  return (
    <div className="react-tel-input" style={style || containerStyle}>
      {!validStatus.valid && <Msg>{errorMsg}</Msg>}
      <InputMask
        data-cy="phone"
        className={`form-control ${!validStatus.valid ? "invalid" : ""}`}
        style={inputStyle}
        onChange={(e) => handlePhoneInput(e)}
        value={phoneNumber}
        type="phone"
        id={id ? id : "phone"}
        // mask="+1\(999) 999-9999"/
        mask={getCountryPhoneMask()}
        maskChar=""
        // formatChars={{
        //   "9": "[0-9]",
        //   "a": "[A-Za-z]",
        //   "*": "[A-Za-z0-9]"
        // }}
      />
      {/* <input
        className="form-control "
        style={inputStyle}
        onChange={(e) => handlePhoneInput(e)}
        value={phoneNumber}
        type="tel"
      /> */}

      <div
        ref={dropdownMenuRef}
        className={`flag-dropdown ${showDropdown ? "open" : ""} ${
          !validStatus.valid ? "invalid" : ""
        }`}
        style={buttonStyle}
      >
        <div
          onClick={(e) => handleFlagDropdownClick(e)}
          className={`selected-flag ${showDropdown ? "open" : ""}`}
          title={
            selectedCountry
              ? `${selectedCountry.name}: + ${selectedCountry.dialCode}`
              : ""
          }
          role="button"
          aria-haspopup="listbox"
          aria-expanded={showDropdown ? true : undefined}
        >
          <div className={`flag ${selectedCountry.iso2}`}>
            <div className={`arrow ${showDropdown ? "up" : ""}`} />
          </div>
        </div>
        {showDropdown && (
          <ul
            className={`country-list ${showDropdown ? "hide" : ""}`}
            style={dropdownStyle}
            role="listbox"
            tabIndex="0"
          >
            {enableSearch && (
              <li className={`search ${searchClass}`}>
                {!disableSearchIcon && (
                  <span
                    className={`search-emoji ${
                      searchClass ? searchClass + "-emoji" : ""
                    }`}
                    role="img"
                    aria-label="Magnifying glass"
                  >
                    &#128270;
                  </span>
                )}
                <input
                  className={`search-box ${
                    searchClass ? searchClass + "-box" : ""
                  }`}
                  style={searchStyle}
                  type="search"
                  placeholder={searchPlaceholder}
                  autoFocus={true}
                  autoComplete={autocompleteSearch ? "on" : "off"}
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e)}
                />
              </li>
            )}
            {countryDropdownList.length > 0 ? (
              countryDropdownList
            ) : (
              <li className="no-entries-message">
                <span>{searchNotFound}</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
