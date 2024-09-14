import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import { useBoardContext } from "../../../context/boardContext";
import useFetch from "../../../hooks/useFetch";

const SectionInput = ({ isOpen, handleCloseSectionModal }) => {
    const { addNewSection } = useBoardContext();
    const { makeRequest: postSection } = useFetch();

    const handleSectionSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.title.value;
        // Making a POST request to create the new section on the server
        const response = await postSection(
            "/section",
            { body: { name } },
            "POST"
        );
        // Adding new Section after the successful server response
        addNewSection({
            id: response.result._id,
            name: response.result.name,
            taskIds: [],
        });

        // Closing the modal after successful submission
        handleCloseSectionModal();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleCloseSectionModal}>
            <h2 className="text-2xl font-medium mx-4 my-4">New Section</h2>
            <form
                className="px-8 pb-4 space-y-3"
                onSubmit={handleSectionSubmit}
            >
                <div className="flex flex-col gap-1 w-full">
                    <label>Section title</label>
                    <input
                        className="w-full p-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder="Section title"
                        name="title"
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <Button
                        type="button"
                        className="w-[90px]"
                        onClick={handleCloseSectionModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-gray-900 text-white w-[90px]"
                    >
                        Add
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default SectionInput;
