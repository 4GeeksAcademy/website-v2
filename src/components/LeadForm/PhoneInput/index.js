import React, { useState } from 'react';
import countriesList from './countriesList';
import InputMask from 'react-input-mask'

// masks={{fr: '(...) ..-..-..', at: '(....) ...-....'}}
// {{ca: 0, us: 1, kz: 0, ru: 1}}
// areaCodes={{gr: ['2694', '2647'], fr: ['369', '463'], us: ['300']}}

const PhoneInput = ({
  defaultMask = '+999 999 999 999 999',
  prefix = '+',
  containerStyle,
  formData,
  style,
  inputStyle,
  buttonStyle,
  dropdownStyle,
  setVal,
  enableSearch = true,
  searchClass = '',
  disableSearchIcon = false,
  searchStyle,
  searchPlaceholder = 'search',
  autocompleteSearch = false,
  searchNotFound = 'No entries to show',
  sessionContext,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedCountry, setSelectedCountry] = useState({});
  let highlightCountryIndex = 0;

  const getCountryPhoneMask= () => {
    const maskList = [
      {us: '+9\ (999) 999-9999'},
      {cl: '+999 9999 9999'},
      {default: defaultMask},
    ];
    const getMask = maskList.find(code => code[selectedCountry.iso2] || code['default'])
    return getMask[selectedCountry.iso2] || getMask['default']
  }

  const rawCountries = JSON.parse(JSON.stringify(countriesList));
  const initializedCountries = [].concat(...rawCountries.map((country) => {
    const countryItem = {
      name: country[0],
      locations: country[1],
      iso2: country[2],
      countryCode: country[3],
      dialCode: country[3],
      priority: country[5] || 0,
    };

    return [countryItem];
  }));

  React.useEffect(() => {
    initializedCountries.find(country => {
      //                                        Session.location
      country.locations.some(location => location === sessionContext || location === 'downtown-miami') && setSelectedCountry(country)
    })
  }, [sessionContext])

  React.useEffect(() => {
    const prefix = `+${selectedCountry.dialCode}`;
    setPhoneNumber(prefix)
  }, [selectedCountry])

  const handleSearchChange = (e) => {
    const { currentTarget: { value: searchValue } } = e;
    setSearchValue(searchValue)
  }

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
      if (/^\d+$/.test(sanitizedSearchValue)) { // contains digits only
         // values wrapped in ${} to prevent undefined
        return allCountries.filter(({ dialCode }) =>
          [`${dialCode}`].some(field => field.toLowerCase().includes(sanitizedSearchValue)))
      } else {
        const iso2countries = allCountries.filter(({ iso2 }) =>
          [`${iso2}`].some(field => field.toLowerCase().includes(sanitizedSearchValue)))
        // || '' - is a fix to prevent search of 'undefined' strings
        // Since all the other values shouldn't be undefined, this fix was accepte
        // but the structure do not looks very good
        const searchedCountries = allCountries.filter(({ name, localName, iso2 }) =>
          [`${name}`, `${localName || ''}`].some(field => field.toLowerCase().includes(sanitizedSearchValue)))
        return [...new Set([].concat(iso2countries, searchedCountries))]
      }
    } else {
      return allCountries
    }
  }

  const handleFlagItemClick = (country, e) => {
    e.preventDefault();
    setSelectedCountry(country);
    setShowDropdown(false);
  }

  const handlePhoneInput = (e) => {
    const prefix = `+${selectedCountry.dialCode}`;
    const input = e.target.value
    setPhoneNumber(prefix + input.substr(prefix.length))
    
    setVal({...formData, phone: {value: phoneNumber, valid: true}})
  }

  const searchedCountries = getSearchFilteredCountries()

  let countryDropdownList = searchedCountries.map((country, index) => {
    const highlight = highlightCountryIndex === index;
    return (
      <li
        key={`flag_no_${index}`}
        data-flag-key={`flag_no_${index}`}
        className={`country ${highlight ? 'highlight' : ''}`}
        data-dial-code='1'
        tabIndex='-1'
        data-country-code={country.iso2}
        onClick={(e) => handleFlagItemClick(country, e)}
        role='option'
        {...highlight ? { "aria-selected": true } : {}}
      >
        <div className={`flag ${country.iso2}`}/>
        <span className='country-name'>{country.localName || country.name}</span>
        <span className='dial-code'>{prefix+country.dialCode}</span>
      </li>
    );
  });

  return (
    <div className="react-tel-input" style={style || containerStyle}>
      <InputMask
        className="form-control"
        style={inputStyle}
        onChange={(e) => handlePhoneInput(e)}
        value={phoneNumber}
        type="phone"
        // mask="+1\(999) 999-9999"/
        mask={getCountryPhoneMask()}
        // placeholder={getCountryPhoneMask()}
        maskChar=""
        formatChars={{
          "9": "[0-9]",
          // a: "[A-Za-z]",
          // "*": "[A-Za-z0-9]"
        }}
      />
      {/* <input
        className="form-control "
        style={inputStyle}
        onChange={(e) => handlePhoneInput(e)}
        value={phoneNumber}
        type="tel"
      /> */}

      <div
        className={`flag-dropdown ${showDropdown ? 'open' : ''}`}
        style={buttonStyle}
      >
        <div
          onClick={(e) => handleFlagDropdownClick(e)}
          className={`selected-flag ${showDropdown ? 'open' : ''}`}
          title={selectedCountry ? `${selectedCountry.name}: + ${selectedCountry.dialCode}` : ''}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={showDropdown ? true : undefined}
        >
          <div className={`flag ${selectedCountry.iso2}`}>
            <div className={`arrow ${showDropdown ? 'up' : ''}`} />
          </div>
        </div>
        {showDropdown && (
          <ul
            className={`country-list ${showDropdown ? 'hide' : ''}`}
            style={dropdownStyle}
            role='listbox'
            tabIndex='0'
          >
            {enableSearch && (
              <li
                className={`search ${searchClass}`}
              >
                {!disableSearchIcon &&
                  <span
                    className={`search-emoji ${searchClass ? searchClass+'-emoji' : ''}`}
                    role='img'
                    aria-label='Magnifying glass'
                  >
                    &#128270;
                  </span>}
                <input
                  className={`search-box ${searchClass ? searchClass+'-box' : ''}`}
                  style={searchStyle}
                  type='search'
                  placeholder={searchPlaceholder}
                  autoFocus={true}
                  autoComplete={autocompleteSearch ? 'on' : 'off'}
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e)}
                />
              </li>
            )}
            {
              countryDropdownList.length > 0
              ? countryDropdownList
              : (
                <li className='no-entries-message'>
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
