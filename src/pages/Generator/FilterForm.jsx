import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { filterFormValues, defaultGenres } from "./FilterFormValues";
import { CheckBox } from "@mui/icons-material";

const OptionButton = ({ title, onClick, isActive, sx, disabled }) => {
  const sxSettings = {
    backgroundColor: isActive ? "highlight.main" : "secondary.light",
    color: isActive ? "#fff" : "#000",
    borderRadius: 99,
    textTransform: "capitalize",
    border: 0,
    boxShadow: "none",
    border: 2,
    borderColor: isActive ? "primary.main" : "transparent",
    paddingY: 0.2,
    "&:hover": {
      backgroundColor: isActive ? "highlight.main" : "secondary.light",
      boxShadow: "none",
    },
  };
  return (
    <Grid item>
      <Button
        variant="contained"
        onClick={onClick}
        sx={Object.assign({}, sxSettings, sx)}
        disabled={disabled ? true : false}
      >
        {title}
      </Button>
    </Grid>
  );
};

const OptionContainer = ({ children, title }) => {
  return (
    <Grid container spacing={1} marginTop={2}>
      <Grid item md={12}>
        <Typography fontWeight={600}>{title}</Typography>
      </Grid>
      {children}
    </Grid>
  );
};

const FilterForm = ({ filterForm, setFilterForm }) => {
  const isSmScreen = useMediaQuery("(max-width:900px)");
  const handleAllChanges = (value, sectionTitle) => {
    switch (sectionTitle) {
      case "Popularity":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          popularity: value,
        }));
        break;
      case "Time Signature":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          timeSignature: value,
        }));
        break;
      case "Key":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          key: value,
        }));
        break;
      case "Mode":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          mode: value,
        }));
        break;
      case "Speechiness":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          speechy: value,
        }));
        break;
      case "Instrumentalness":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          instrumental: value,
        }));
        break;
      case "Liveness":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          live: value,
        }));
        break;
      case "Number Of Tracks":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          numberOfTracks: value,
        }));
        break;
      default:
        console.log("default is called");
    }
  };

  const handleGenreClick = (value) => {
    if (filterForm.genres.includes(value)) {
      let newGenres = filterForm.genres;
      newGenres = newGenres.filter((item) => item !== value);
      setFilterForm((oldFilterForm) => ({
        ...oldFilterForm,
        genres: newGenres,
      }));
    } else {
      let newGenres = filterForm.genres;
      newGenres.push(value);
      setFilterForm((oldFilterForm) => ({
        ...oldFilterForm,
        genres: newGenres,
      }));
    }
  };

  return (
    <Grid
      item
      xs={12}
      md={6}
      paddingX={5}
      paddingBottom={4}
      marginTop={4}
      height={isSmScreen ? "auto" : "calc(100vh - 220px)"}
      sx={{
        overflowY: "scroll",
      }}
    >
      <Typography fontSize={28} color={"primary.main"} fontWeight={700}>
        Filters
      </Typography>
      {/* Popularity */}

      {filterFormValues.map((section, index) => (
        <OptionContainer key={index} title={section.title}>
          {section.options.map((option, index) => (
            <OptionButton
              key={index}
              title={option.title}
              onClick={() => handleAllChanges(option.value, section.title)}
              isActive={filterForm[section.stateTitle] === option.value}
            />
          ))}
        </OptionContainer>
      ))}

      <Grid container marginTop={2}>
        <Grid
          item
          display={"flex"}
          alignItems={"center"}
          gap={1}
          sx={{
            cursor: "pointer",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={!filterForm.customerChoiceGenres}
                onChange={() =>
                  setFilterForm((oldFilterForm) => ({
                    ...oldFilterForm,
                    customerChoiceGenres: !oldFilterForm.customerChoiceGenres,
                  }))
                }
                sx={{
                  color: "dark.main",
                  "&.Mui-checked": {
                    color: "highlight.main",
                  },
                }}
              />
            }
            label={
              <Typography fontWeight={600}>
                Customize according to genre
              </Typography>
            }
            sx={{
              fontSize: 23,
            }}
          />
        </Grid>
        <Grid
          item
          onClick={
            filterForm.customerChoiceGenres
              ? (e) => e.stopPropagation()
              : () => null
          }
          marginTop={1}
          sx={{
            opacity: filterForm.customerChoiceGenres ? 0.2 : 1,
          }}
        >
          <Grid container spacing={1}>
            {defaultGenres.map((genre, index) => (
              <OptionButton
                key={index}
                title={genre.name}
                onClick={() =>
                  filterForm.customerChoiceGenres
                    ? null
                    : handleGenreClick(genre.value)
                }
                isActive={filterForm.genres.includes(genre.value)}
                sx={{
                  backgroundColor: "secondary.light",
                  opacity: filterForm.genres.includes(genre.value) ? 1 : 0.5,
                  color: "#000",
                  border: 0,
                  "&:hover": {
                    backgroundColor: "secondary.light",
                    boxShadow: "none",
                  },
                }}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterForm;
