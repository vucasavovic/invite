const ApiResponse = require('../error/ApiResponse');
const Invitation = require('../model/Invitation');


const getPublicInvitation = async function(req,res,next){
  console.log(req.params.id)
  try {
    const invitation = await Invitation.findOne(
      {attributes:[
        'id',
        'templateId',
        'intro',
        'brideName',
        'groomName',
        'mainParagraph',
        'date',
        'publicationDate',
        'time',
        'place',
        'address',
        'lastLine'
      ],
      where:{id:req.params.id}})
      
       if(invitation){
         res.render(`weddingInvitationTemplate${invitation.templateId}`,{invitation:invitation})
       }else{
         res.render('notFound',{invitation:invitation})
       }
       
  
  } catch (error) {
    next(error)
  }
}

const getAll = async function(req,res,next){
    try {
        let invitations = await Invitation.findAll({
            attributes: { exclude: ['userId'] },
            where: { userId: req.user.id }   
        });
        
        if(invitations.length>0){
          invitations.forEach(invitation => {
            invitation.date = fromMysqlDate(invitation.date)
            invitation.publicationDate = fromMysqlDate(invitation.publicationDate)
        });
        }
         
        res.send(ApiResponse.success('',invitations));
    } catch (error) {
      next(error)
    }     
}
const save = async function(req,res,next){
  let invitation = req.body;

  invitation.date = toMysqlDate(invitation.date)
  invitation.publicationDate = toMysqlDate(invitation.publicationDate)
  ///// This is not good, make it production uRL
  
   try {
    /// update invitation or save new
    if(!invitation.id){
      invitation = await Invitation.create({userId:req.user.id,...invitation});
      const publicUrl = `http://localhost:3000/invitation/${invitation.id}`
      invitation = await Invitation.update(
        {publicUrl:publicUrl},
        {where:{id:invitation.id}}
      )
    }else{
      invitation = await Invitation.update(
        {userId:req.user.id,...invitation},
        {where:{id:invitation.id}}
      );
    }
    res.send(ApiResponse.success('Invitation saved',invitation))
  } catch (error) {
    next(error)
  }
} 

const del = async function(req,res,next){
  const {invitationId} = req.body
  try {
    const del = await Invitation.destroy({where:{id:invitationId}})
    res.send(ApiResponse.success('Invitation deleted',{}))
  } catch (error) {
    next(error)
  }
}

function toMysqlDate(dateObj){
  return dateObj.year + '-' + dateObj.month + '-' + dateObj.day 
}

function fromMysqlDate(mysqlDate){
  const dateChunks = mysqlDate.split('-');
  return {day:dateChunks[2],month:dateChunks[1],year:dateChunks[0]}
}

module.exports = {
    getPublicInvitation,
    getAll,
    save,
    del
}