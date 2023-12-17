import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import {
  filterFormValues,
  defaultGenres,
  keysSection,
  timeSignatureSection,
} from "./FilterFormValues";
import { CheckBox } from "@mui/icons-material";
import toast from "react-hot-toast";

const OptionButton = ({ title, onClick, isActive, sx, disabled }) => {
  const sxSettings = {
    backgroundColor: isActive ? "highlight.main" : "secondary.light",
    color: isActive ? "light.main" : "dark.main",
    borderRadius: 99,
    textTransform: "capitalize",
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
        className="opening-animation"
      >
        {title}
      </Button>
    </Grid>
  );
};

const OptionContainer = ({ children, title, tooltip }) => {
  return (
    <Grid container marginTop={2}>
      <Tooltip title={tooltip || ""} placement="right">
        <Box
          display={"flex"}
          sx={{
            cursor: "default",
          }}
        >
          <Typography fontWeight={600} color={"dark.main"}>
            {title}
          </Typography>
        </Box>
      </Tooltip>
      <Grid container spacing={1} marginTop={0} alignItems={"center"}>
        {children}
      </Grid>
    </Grid>
  );
};

const multipleOptionsContainer = ({ children, title }) => {
  return (
    <Grid container spacing={1} marginTop={2}>
      <Grid item xs={12}>
        <Typography fontWeight={600}>{title}</Typography>
      </Grid>
      {children}
    </Grid>
  );
};

function isSameArr(arr1, arr2) {
  return (
    JSON.stringify(arr1.slice().sort()) === JSON.stringify(arr2.slice().sort())
  );
}

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
      case "Speechy":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          speechy: value,
        }));
        break;
      case "Instrumental":
        setFilterForm((oldFilterForm) => ({
          ...oldFilterForm,
          instrumental: value,
        }));
        break;
      case "Live":
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
        console.log(null);
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
      <Typography
        fontSize={28}
        color={"primary.main"}
        fontWeight={700}
        className="fade-in-rtl"
      >
        Filters
      </Typography>
      {/* Popularity */}

      {filterFormValues.map((section, index) => (
        <Grid container key={index}>
          <OptionContainer title={section.title} tooltip={section?.tooltip}>
            {section.options.map((option, index) => (
              <OptionButton
                key={index}
                title={option.title}
                onClick={() => handleAllChanges(option.value, section.title)}
                isActive={filterForm[section.stateTitle] === option.value}
              />
            ))}
          </OptionContainer>
          {/* Time Signature Section */}

          {index == 0 && (
            <OptionContainer
              title={"Time Signature"}
              tooltip={timeSignatureSection.tooltip}
            >
              <OptionButton
                title={
                  filterForm?.timeSignature?.length === 3 ? "All" : "Select All"
                }
                isActive={filterForm?.timeSignature?.length === 3}
                onClick={() =>
                  setFilterForm((oldFilterForm) => ({
                    ...oldFilterForm,
                    timeSignature: [3, 4, 5],
                  }))
                }
              />
              {timeSignatureSection.options.map((option, index) => (
                <OptionButton
                  key={index}
                  title={option.title}
                  isActive={filterForm.timeSignature.includes(option.value)}
                  sx={{
                    backgroundColor:
                      filterForm.timeSignature.includes(option.value) &&
                      !isSameArr(filterForm.timeSignature, [3, 4, 5])
                        ? "highlight.main"
                        : "secondary.light",
                    border:
                      filterForm.timeSignature.includes(option.value) &&
                      !isSameArr(filterForm.timeSignature, [3, 4, 5])
                        ? 2
                        : 0,
                    opacity:
                      filterForm.timeSignature.includes(option.value) &&
                      !isSameArr(filterForm.timeSignature, [3, 4, 5])
                        ? 1
                        : isSameArr(filterForm.timeSignature, [3, 4, 5])
                        ? 1
                        : 0.5,
                    color:
                      filterForm.timeSignature.includes(option.value) &&
                      !isSameArr(filterForm.timeSignature, [3, 4, 5])
                        ? "light.main"
                        : "dark.main",

                    "&:hover": {
                      backgroundColor:
                        filterForm.timeSignature.includes(option.value) &&
                        !isSameArr(filterForm.timeSignature, [3, 4, 5])
                          ? "highlight.main"
                          : "secondary.light",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => {
                    if (filterForm.timeSignature.includes(option.value)) {
                      //there should be at least 1 item unchecked
                      if (filterForm.timeSignature.length == 1) {
                        toast.error(
                          "There should be at least one active time signature filter!"
                        );
                      } else {
                        setFilterForm((oldFilterForm) => ({
                          ...oldFilterForm,
                          timeSignature: oldFilterForm.timeSignature.filter(
                            (item) => item != option.value
                          ),
                        }));
                      }
                    } else {
                      setFilterForm((oldFilterForm) => ({
                        ...oldFilterForm,
                        timeSignature: [
                          ...oldFilterForm.timeSignature,
                          option.value,
                        ],
                      }));
                    }
                  }}
                />
              ))}
            </OptionContainer>
          )}
          {/* Keys Section */}
          {index == 0 && (
            <OptionContainer title={"Keys"} tooltip={keysSection.tooltip}>
              <OptionButton
                title={filterForm?.key?.length === 12 ? "All" : "Select All"}
                isActive={filterForm?.key?.length === 12}
                onClick={() =>
                  setFilterForm((oldFilterForm) => ({
                    ...oldFilterForm,
                    key: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                  }))
                }
              />
              {keysSection.options.map((option, index) => (
                <OptionButton
                  key={index}
                  title={option.title}
                  isActive={filterForm.key.includes(option.value)}
                  sx={{
                    backgroundColor:
                      filterForm.key.includes(option.value) &&
                      !isSameArr(
                        filterForm.key,
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                      )
                        ? "highlight.main"
                        : "secondary.light",
                    opacity:
                      filterForm.key.includes(option.value) &&
                      !isSameArr(
                        filterForm.key,
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                      )
                        ? 1
                        : isSameArr(
                            filterForm.key,
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                          )
                        ? 1
                        : 0.5,
                    color:
                      filterForm.key.includes(option.value) &&
                      !isSameArr(
                        filterForm.key,
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                      )
                        ? "light.main"
                        : "dark.main",
                    border:
                      filterForm.key.includes(option.value) &&
                      !isSameArr(
                        filterForm.key,
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                      )
                        ? 2
                        : 0,

                    "&:hover": {
                      backgroundColor:
                        filterForm.key.includes(option.value) &&
                        !isSameArr(
                          filterForm.key,
                          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
                        )
                          ? "highlight.main"
                          : "secondary.light",
                      boxShadow: "none",
                    },
                  }}
                  onClick={() => {
                    if (filterForm.key.includes(option.value)) {
                      if (filterForm.key.length == 1) {
                        toast.error(
                          `There should be at least one active key filter!`
                        );
                      } else {
                        setFilterForm((oldFilterForm) => ({
                          ...oldFilterForm,
                          key: oldFilterForm.key.filter(
                            (item) => item != option.value
                          ),
                        }));
                      }
                    } else {
                      setFilterForm((oldFilterForm) => ({
                        ...oldFilterForm,
                        key: [...oldFilterForm.key, option.value],
                      }));
                    }
                  }}
                />
              ))}
            </OptionContainer>
          )}
        </Grid>
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
              <Switch
                checked={!filterForm.customerChoiceGenres}
                onChange={() =>
                  setFilterForm((oldFilterForm) => ({
                    ...oldFilterForm,
                    customerChoiceGenres: !oldFilterForm.customerChoiceGenres,
                  }))
                }
                sx={{
                  "& .MuiSwitch-thumb": {
                    color: filterForm.customerChoiceGenres
                      ? "secondary.main"
                      : "primary.main",
                  },
                  "& .MuiSwitch-track": {
                    color: filterForm.customerChoiceGenres
                      ? "secondary.light"
                      : "secondary.main",
                  },
                }}
              />
            }
            label={
              <Tooltip
                title="If you leave this unchecked, genres are distributed based on their weight
        that the customer survey determined"
                placement="bottom"
              >
                <Typography fontWeight={600}>
                  Customize according to genre
                </Typography>
              </Tooltip>
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
            <OptionButton
              title={filterForm.genres.length == 15 ? "All" : "Select All"}
              onClick={() =>
                filterForm.customerChoiceGenres
                  ? null
                  : setFilterForm((oldFilterForm) => ({
                      ...oldFilterForm,
                      genres: [
                        "Rock",
                        "Pop",
                        "Metal",
                        "Hip Hop",
                        "Electronic",
                        "Latin",
                        "World/Traditional",
                        "Jazz",
                        "R&B",
                        "Blues",
                        "Easy Listening",
                        "Classical",
                        "Folk/Acoustic",
                        "Country",
                        "New Age",
                      ],
                    }))
              }
              isActive={filterForm.genres.length == 15}
            />

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
                  backgroundColor:
                    filterForm.genres.length == 15
                      ? "secondary.light"
                      : filterForm.genres.includes(genre.value)
                      ? "highlight.main"
                      : "secondary.light",
                  color:
                    filterForm.genres.length == 15
                      ? "dark.main"
                      : filterForm.genres.includes(genre.value)
                      ? "light.main"
                      : "dark.main",

                  border: filterForm.genres.length == 15 ? 0 : 2,

                  opacity: filterForm.genres.includes(genre.value) ? 1 : 0.5,

                  "&:hover": {
                    backgroundColor:
                      filterForm.genres.length == 15
                        ? "secondary.light"
                        : filterForm.genres.includes(genre.value)
                        ? "highlight.main"
                        : "secondary.light",
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
