import * as React from "react";
import Medal from "./Medal";
import { Box, Table, Flex, Badge, Button, Dialog } from "@radix-ui/themes";
import { TrashIcon, CheckIcon, ResetIcon } from "@radix-ui/react-icons";

function Country(props) {
  const [open, setOpen] = React.useState(false);

  function getMedalsTotal() {
    let sum = 0;
    // use medal count displayed in the web page for medal count totals
    props.medals.forEach((medal) => {
      sum += props.country[medal.name].page_value;
    });
    return sum;
  }
  // determines if there are any difference between page_value and saved_value for any medals
  function renderSaveButton() {
    let unsaved = false;
    props.medals.forEach((medal) => {
      if (
        props.country[medal.name].page_value !==
        props.country[medal.name].saved_value
      ) {
        unsaved = true;
      }
    });
    return unsaved;
  }

  function confirmDelete() {
    props.onDelete(props.country.id);
  }

  return (
    <Box width="300px" p="2">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell colSpan="2">
              <Flex justify="between">
                <span>
                  {props.country.name}
                  <Badge variant="outline" ml="2">
                    {getMedalsTotal(props.country, props.medals)}
                  </Badge>
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "1.2rem",
                    justifyContent: "space-between",
                  }}
                >
                  {renderSaveButton() && (
                    <>
                      <Button
                        color="gray"
                        variant="ghost"
                        size="1"
                        onClick={() => props.onReset(props.country.id)}
                      >
                        <ResetIcon />
                      </Button>
                      <Button
                        color="gray"
                        variant="ghost"
                        size="1"
                        onClick={() => props.onSave(props.country.id)}
                      >
                        <CheckIcon />
                      </Button>
                    </>
                  )}
                  {props.canDelete && (
                    <Button color="red" variant="ghost" size="1">
                      <TrashIcon
                        onClick={() => setOpen(true)}
                      />
                    </Button>
                  )}
                </div>
              </Flex>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {props.medals
            .sort((a, b) => a.rank - b.rank)
            .map((medal) => (
              <Medal
                key={medal.id}
                medal={medal}
                country={props.country}
                canPatch={props.canPatch}
                onIncrement={props.onIncrement}
                onDecrement={props.onDecrement}
              />
            ))}
        </Table.Body>
      </Table.Root>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Add Country</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Are you sure you would like to delete {props.country.name}?
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" onClick={(e) => setOpen(false)}>
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="red" onClick={confirmDelete}>
                Delete
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
}

export default Country;
