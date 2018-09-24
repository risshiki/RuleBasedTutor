rule product {
    
    when {
    p : Problem p.firstPart != null && p.firstPartPlus1 != null && p.product == null
          {firstPart : fp, firstPartPlus1 : fp1, ieProduct: sel};
    ie : InterfaceElement ie.name==sel && ie.value==null;    
         }


  then {
            // do the actual adding of 1
    let pro = fp * fp1;
            // hints
    assert(new Hint("Next step: Take the product of the first part and it's +1 component"));
    //assert(new Hint("If you multiply, "+fp+" to "+fp1+",  you get "+pro+"."));
    //assert(new Hint("Please write "+pro+"."));
            // model observable action
    if(checkSAI({selection: sel, action: "UpdateTextField", input: pro})) {
        modify(p, "product", pro);       // modify semantic representation
        modify(ie, "value", pro);              // modify interface represention in WM
                                            //(this does not change the interface itself!!)
        halt();                 // await next student action
    }
    else {
         backtrack();             // undo any changes and search further
     }
  }

}


rule append25 {
    
    when {
    p : Problem p.firstPart != null && p.firstPartPlus1 != null && p.product != null && p.append25 == null
          {product : pro, ieAppend25: sel};
    ie : InterfaceElement ie.name==sel && ie.value==null;    
         }

         
  then {
            // do the actual adding of 1 
    
    let f_answer = append_25(pro);
            // hints
    assert(new Hint("Next step: Append 25 to your product"));
    assert(new Hint("Add 25 to "+f_answer+" ."));
    assert(new Hint("Please write "+f_answer+"."));
            // model observable action
    if(checkSAI({selection: sel, action: "UpdateTextField", input: f_answer})) {
        modify(p, "append25", f_answer);       // modify semantic representation
        modify(ie, "value", f_answer);              // modify interface represention in WM
                                            //(this does not change the interface itself!!)
        halt();                 // await next student action
    }
    else {
         backtrack();             // undo any changes and search further
     }
  }

}



rule final_Answer {
    
    when {
    p : Problem p.firstPart != null && p.firstPartPlus1 != null && p.product != null && p.append25 != null && p.finalAnswer == null
          {append25 : lastappend, ieFinalAnswer: sel};
    ie : InterfaceElement ie.name==sel && ie.value==null;    
         }

         
  then {
            // do the actual adding of 1 
    
    let f_answer = lastappend;
            // hints
    assert(new Hint("Copy the previous element here"));
    
            // model observable action
    if(checkSAI({selection: sel, action: "UpdateTextField", input: f_answer})) {
        modify(p, "finalAnswer", f_answer);       // modify semantic representation
        modify(ie, "value", f_answer);              // modify interface represention in WM
                                            //(this does not change the interface itself!!)
        halt();                 // await next student action
    }
    else {
         backtrack();             // undo any changes and search further
     }
  }

}


/*

rule Bug_WrongProduct {
    when {
    p : Problem p.firstPart != null && p.firstPartPlus1 != null && p.product == null
          {firstPart : fp, firstPartPlus1 : fp1, ieProduct: sel};
    ie : InterfaceElement ie.name==sel && ie.value==null;    
         }

 then {
     let  incorrect_product = fp1*5;
      if(checkSAI({selection: sel, action: "UpdateTextField", input: incorrect_product})) {
         setSuccessOrBugMsg("Wrong Product! You need to multiply it with the the first part, not 5!");
     }
     backtrack();
 }
}


/*

/*

rule Done {
    when {

    p : Problem p.firstPart != null && p.firstPartPlus1 != null && p.product != null && p.append25 != null && p.finalAnswer != null && p.done ==null
            {ie}
    }
    then {
        assert(new Hint("Anything you may have forgotten?"));
        assert(new Hint("You have finished."));
        assert(new Hint("Please click the Done button."));
        if (checkSAI({selection: "done", action: "ButtonPressed", input: -1})) {
            modify(p, "done", true);
            halt();
        }
    }
}

/*
