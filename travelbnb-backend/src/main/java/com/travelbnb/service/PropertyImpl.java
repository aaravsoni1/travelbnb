package com.travelbnb.service;
import com.travelbnb.entity.Country;
import com.travelbnb.entity.Image;
import com.travelbnb.entity.Location;
import com.travelbnb.entity.Property;
import com.travelbnb.payload.FormDto;
import com.travelbnb.payload.PropertyDto;
import com.travelbnb.repository.CountryRepository;
import com.travelbnb.repository.ImageRepository;
import com.travelbnb.repository.LocationRepository;
import com.travelbnb.repository.PropertyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyImpl implements PropertyService{

    private PropertyRepository propertyRepository;
    private CountryRepository countryRepository;
    private LocationRepository locationRepository;
    private ImageRepository imageRepository;

    public PropertyImpl(PropertyRepository propertyRepository, CountryRepository countryRepository, LocationRepository locationRepository, ImageRepository imageRepository) {
        this.propertyRepository = propertyRepository;
        this.countryRepository = countryRepository;
        this.locationRepository = locationRepository;
        this.imageRepository = imageRepository;
    }

    @Override
    public List<PropertyDto> searchProperty(String name, int pageSize, int pageNo, String sortBy, String sortDir) {
        PageRequest pageable = null;
        if(sortDir.equalsIgnoreCase("asc")){
            pageable = PageRequest.of(pageNo,pageSize, Sort.by(sortBy).ascending());
        }else if(sortDir.equalsIgnoreCase("desc")){
            pageable = PageRequest.of(pageNo,pageSize, Sort.by(sortBy).descending());
        }
        Page<Property> allprop = propertyRepository.searchProperty(name,pageable);
        List<Property> pue = allprop.getContent();
        List<PropertyDto> pud =pue.stream().map( p-> EntityToDto(p)).collect(Collectors.toList());
        return pud;
    }
    @Override
    public PropertyDto addProperty(PropertyDto pdto, long countryId, long locationId) {
        Optional<Country> c = countryRepository.findById(countryId);
        Optional<Location> l = locationRepository.findById(locationId);
        Country country = null;
        if (c.isPresent()) {
            country = c.get();
        }
        Location location = null;
        if (l.isPresent()) {
            location = l.get();
        }
        Property entity = DtoToEntity(pdto);
        entity.setCountry(country);
        entity.setLocation(location);
        Property save = propertyRepository.save(entity);
        PropertyDto dto = EntityToDto(entity);
        return dto;
    }

    @Override
    public boolean deleteProperty(Long id) {
        Optional<Property> opprpperty = propertyRepository.findById(id);
        if(opprpperty.isPresent()){
            propertyRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public PropertyDto updatePropertyDetails(PropertyDto pdto) {
        Optional<Property> byId = propertyRepository.findById(pdto.getId());
        if(byId.isPresent()){
            Property saved = propertyRepository.save(DtoToEntity(pdto));
            return EntityToDto(saved);
        }
        return null;
    }


    public Property DtoToEntity(PropertyDto pdto) {
        Property entity = new Property();
        entity.setId(pdto.getId());
        entity.setName(pdto.getName());
        entity.setNoGuests(pdto.getNoGuests());
        entity.setNo_bedrooms(pdto.getNo_bedrooms());
        entity.setNo_bathrooms(pdto.getNo_bathrooms());
        entity.setPrice(pdto.getPrice());
        return entity;
    }
    public PropertyDto EntityToDto(Property entity){
        PropertyDto pdto = new PropertyDto();
        pdto.setId(entity.getId());
        pdto.setName(entity.getName());
        pdto.setNoGuests(entity.getNoGuests());
        pdto.setNo_bedrooms(entity.getNo_bedrooms());
        pdto.setNo_bathrooms(entity.getNo_bathrooms());
        pdto.setPrice(entity.getPrice());
        pdto.setCountry(entity.getCountry().getId());
        pdto.setLocation(entity.getLocation().getId());

        Optional<Image> byId = imageRepository.findById(entity.getId());
        if (byId.isPresent()){
            pdto.setImage_url(byId.get().getImageUrl());
        }else {
            pdto.setImage_url("");
        }


        return pdto;
    }

    @Override
    public List<PropertyDto> getAll(int pageSize, int pageNo, String sortBy, String sortDir) {
        PageRequest pageable = null;
        if(sortDir.equalsIgnoreCase("asc")){
            pageable = PageRequest.of(pageNo,pageSize, Sort.by(sortBy).ascending());
        }else if(sortDir.equalsIgnoreCase("desc")){
            pageable = PageRequest.of(pageNo,pageSize, Sort.by(sortBy).descending());
        }
        Page<Property> all = propertyRepository.findAll(pageable);
        List<Property> content = all.getContent();
        List<PropertyDto> dto = all.stream().map(p->EntityToDto(p)).collect(Collectors.toList());
        return dto;
    }

    public FormDto addNewProperty(FormDto fdto, MultipartFile file) {
        if(verifyCountry(fdto.getCountry()) == null) {
            Country country = new Country();
            country.setName(fdto.getCountry());
            countryRepository.save(country);
        }
        if(verifyLocation(fdto.getLocation()) == null) {
            Location location = new Location();
            location.setName(fdto.getLocation());
            locationRepository.save(location);
        }
        Property property = new Property();
        property.setName(fdto.getName());
        property.setNoGuests(fdto.getNoGuests());
        property.setNo_bedrooms(fdto.getNo_bedrooms());
        property.setNo_bathrooms(fdto.getNo_bathrooms());
        property.setPrice(fdto.getPrice());
        property.setCountry(verifyCountry(fdto.getCountry()));
        property.setLocation(verifyLocation(fdto.getLocation()));
        Property savedProperty = propertyRepository.save(property);
        FormDto formDto = new FormDto();
        formDto.setId(savedProperty.getId());
        formDto.setName(savedProperty.getName());
        formDto.setNoGuests(savedProperty.getNoGuests());
        formDto.setNo_bedrooms(savedProperty.getNo_bedrooms());
        formDto.setNo_bathrooms(savedProperty.getNo_bathrooms());
        formDto.setPrice(savedProperty.getPrice());
        formDto.setCountry(savedProperty.getCountry().getName());
        formDto.setLocation(savedProperty.getLocation().getName());
        if(file!= null) {
            Image image = new Image();
            image.setProperty(savedProperty);
            image.setImageUrl(ImageService.uploadImageFile(file, "soni007", savedProperty.getId()).getImageUrl());
            imageRepository.save(image);
            formDto.setImage_url(image.getImageUrl());
        }
        return formDto;
    }
    public Country verifyCountry(String country_name){
        Optional<Country> byName = countryRepository.findByName(country_name);
        return byName.orElse(null);
    }

    public Location verifyLocation(String location_name){
        Optional<Location> byName = locationRepository.findByName(location_name);
        return byName.orElse(null);
    }

    public boolean existsProperty(long id){

        boolean val = propertyRepository.existsById(id);
        return val;
    }
}
