import React from 'react';

const CreatePost = () => {
    return (
        <form className="text-white flex flex-col justify-center items-center h-screen m-auto">
            <div className="outline-white flex flex-col justify-center items-center rounded-xl sm:w-1/2 h-auto lg:w-1/3 xl:w-1/4">
                <div className="m-4">
                    <label htmlFor="title" className="block space-y-2 my-3 text-xl font-bold">Title</label>
                    <input id="create-title" type="text" placeholder="e.g This is a post"
                        className="text-black rounded-md p-0.5 pl-2 text-lg" />
                </div>
                <div className="mb-2">
                    <label htmlFor="description" className="block space-y-2 my-3 text-xl font-bold">Description</label>
                    <textarea id="create-description" type="text" placeholder="e.g You can write the description of your post here" className="resize-none w-52 h-32 text-black rounded-md p-0.5 pl-2"></textarea>
                </div>
                <div>
                    <label htmlFor="image" className="block space-y-2 my-3 text-xl font-bold">Image url</label>
                    <input id="create-image" type="text" placeholder="www.page.com/image" className="text-black border-none rounded-md p-0.5 pl-2 text-lg"/>
                </div>
                <button type="submit" resize className="bg-red-700 text-white font-bold py-2 px-4 rounded-xl w-1/4 mt-6 mb-6 shadow-xl hover:bg-red-900">Create!</button>
            </div>
        </form>
    );
}
    
export default CreatePost;