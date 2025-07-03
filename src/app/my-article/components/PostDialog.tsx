import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { dataCategory } from '@/helper/dataCategory';

interface IAppProps {
    isDialog :any;
    setDialog:any;
    formData:any;
    handleInputChange: any;
    submitEdit: any;
    setFormData: any;
}



const PostEditDialog: React.FunctionComponent<IAppProps> = ({isDialog, setDialog, formData, handleInputChange, submitEdit, setFormData}) => {

      const [category, setCategory] = React.useState<string[]>([
        "All",
        ...dataCategory,
      ]);

  return (

    <Dialog open={isDialog} onOpenChange={setDialog} >
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit post</DialogTitle>
              <DialogDescription>
                Make changes to your post here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title-1">Title</Label>
                <Input id="title-1" name="title" value={formData.title} onChange={handleInputChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="thumbnail-1">thumbnail</Label>
                <Input id="thumbnail-1" name="thumbnail" value={formData.thumbnail} onChange={handleInputChange} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content-1">Content</Label>
                <textarea name="content" id="content-1" value={formData.content} onChange={handleInputChange} />
              </div>
              <div id="category">
                <Select value={formData.category}
                  onValueChange={value => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" onChange={handleInputChange} />
                  </SelectTrigger>
                  <SelectContent>
                    {dataCategory.map((val:string) => {
                        return <SelectItem key={val} value={val}>{val}</SelectItem>
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setDialog(false)}>Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={submitEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>


  )
};

export default PostEditDialog;
